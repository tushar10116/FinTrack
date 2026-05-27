const express = require('express');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch expenses' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
      date
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: 'Invalid expense data' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user.id });
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    expense.title = req.body.title ?? expense.title;
    expense.amount = req.body.amount ?? expense.amount;
    expense.category = req.body.category ?? expense.category;
    expense.date = req.body.date ?? expense.date;

    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: 'Unable to update expense' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete expense' });
  }
});

module.exports = router;
