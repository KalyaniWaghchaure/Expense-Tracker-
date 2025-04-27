// routes/expenses.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// GET all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new expense
router.post('/', async (req, res) => {
  const expense = new Expense({
    amount: req.body.amount,
    category: req.body.category,
    description: req.body.description,
    date: req.body.date
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET single expense
router.get('/:id', getExpense, (req, res) => {
  res.json(res.expense);
});

// PUT update expense
router.put('/:id', getExpense, async (req, res) => {
  if (req.body.amount != null) {
    res.expense.amount = req.body.amount;
  }
  if (req.body.category != null) {
    res.expense.category = req.body.category;
  }
  if (req.body.description != null) {
    res.expense.description = req.body.description;
  }
  if (req.body.date != null) {
    res.expense.date = req.body.date;
  }

  try {
    const updatedExpense = await res.expense.save();
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE expense
router.delete('/:id', async (req, res) => {
  try {
    const result = await Expense.findByIdAndDelete(req.params.id);
    
    if (!result) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get expense by ID
async function getExpense(req, res, next) {
  let expense;
  try {
    expense = await Expense.findById(req.params.id);
    if (expense == null) {
      return res.status(404).json({ message: 'Expense not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.expense = expense;
  next();
}

module.exports = router;