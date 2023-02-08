const express= require ('express');
const router= express.Router();
const expenseController = require('../controllers/expense')
const userAuthentication = require('../middlewares/auth')

router.post('/add-expense', userAuthentication.authenticate, expenseController.addExpense);
router.get('/get-expense', userAuthentication.authenticate, expenseController.getExpense);
router.delete('/delete-expense/:id',userAuthentication.authenticate, expenseController.deleteExpense);
router.get('/download', userAuthentication.authenticate, expenseController.downloadExpense);

module.exports=router;