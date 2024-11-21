const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  date: Date,
});

module.exports = mongoose.model("Expense", ExpenseSchema);
