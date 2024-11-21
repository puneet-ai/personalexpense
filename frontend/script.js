const API_URL = "http://localhost:5000/api/expenses";

// Fetch and display expenses on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchExpenses();
});

// Fetch expenses from the backend
async function fetchExpenses() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    // Update the chart and summary
    updateChart(data);
    updateSummary(data);
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
}

// Add new expense
document.getElementById("expense-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, category, date }),
    });

    fetchExpenses(); // Refresh data
  } catch (error) {
    console.error("Error adding expense:", error);
  }
});

// Update chart with Chart.js
function updateChart(expenses) {
  const categories = {};
  expenses.forEach((expense) => {
    categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
  });

  const ctx = document.getElementById("expense-chart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(categories),
      datasets: [{
        label: "Expenses",
        data: Object.values(categories),
        backgroundColor: ["#4CAF50", "#FF5733", "#FFC300"],
      }],
    },
  });
}

// Update summary
function updateSummary(expenses) {
  const dayTotal = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  document.getElementById("day-total").textContent = `$${dayTotal}`;
}
