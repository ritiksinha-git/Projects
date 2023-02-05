const db = require('./util/database');
const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');
const app = express();

const dotenv = require('dotenv');

// get config vars
dotenv.config();

const User = require('./models/users');
const Expense = require('./models/expense');
const Order = require('./models/orders');
const Forgotpassword = require('./models/resetPassword');

const userRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase')
const premiumF = require('./routes/premiumF')
const resetPassword = require('./routes/resetPassword')

var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes)
app.use('/premium', premiumF);
app.use('/password', resetPassword);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

db.sync()
    .then(() => {
        app.listen(2000);
    })
    .catch(err => {
        console.log(err);
 })