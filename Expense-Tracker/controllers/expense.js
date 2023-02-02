const Expense = require('../models/expense');

exports.addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    // uses the request body object to create new expense using expense model
    const expense = await req.user.createExpense({ amount, description, category });
    res.status(201).json({ expense, success: true });
  } catch (error) {
    res.status(500).json({ error: err });
  }
};

exports.getExpense = async (req, res) => {
    try {
    const expenses = await Expense.findAll({where: { userId: req.user.id }});
    res.status(200).json({ allExpenses: expenses });
    } catch (error) {
    res.status(500).json({ error: err });
    }
    };
    
    exports.deleteExpense = async (req, res) => {
    try {
    const expenseId = req.params.id;
    const expense = await Expense.findOne({where: {id: expenseId, userId: req.user.id }});
    if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
    }
    await expense.destroy();
    res.status(204).json();
    } catch (error) {
    res.status(500).json({ error: err });
    }
    };