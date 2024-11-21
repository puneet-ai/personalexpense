const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Get all expenses
router.get("/", async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

// Add expense
router.post("/", async (req, res) => {
  const { amount, category, date } = req.body;
  const expense = new Expense({ amount, category, date });
  await expense.save();
  res.json(expense);
});

module.exports = router;
