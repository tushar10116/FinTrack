const express = require('express');
const Expense = require('../models/Expense');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch expenses' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const expense = await Expense.create({ title, amount, category, date });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: 'Invalid expense data' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: 'Unable to update expense' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete expense' });
  }
});

module.exports = router;
