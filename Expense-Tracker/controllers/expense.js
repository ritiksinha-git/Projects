const Expense = require('../models/expense');

exports.addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    // uses the request body object to create new expense using expense model
    const expense = await Expense.create({ amount, description, category });
    res.status(201).json({ expense });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getExpense = async (req, res) => {
  try {
    // it retrieves all the expenses with expense model and findall method
    const expenses = await Expense.findAll();
    res.status(200).json({ allExpenses: expenses });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id; 
    // it uses expenseId from request paramenters to find the expense by it's primary key
    const expense = await Expense.findByPk(expenseId);  
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    await expense.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error });
  }
};