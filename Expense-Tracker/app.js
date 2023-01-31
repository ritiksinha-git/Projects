const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/users');
const db = require('./util/database');
const User = require('./models/users');
const Expense = require('./models/expense');
const expenseRoutes = require('./routes/expense');
const app = express();
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

app.use('/user', userRoutes);
app.use('/user', loginRoutes);
app.use('/expense', expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

db.sync()
.then(() => {
app.listen(2000);
})
.catch(err => console.log(err));