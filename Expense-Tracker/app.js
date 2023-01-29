const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const sequelize = require('./util/database');
// const User = require('./models/users');
const expenseRoutes = require('./routes/expense');
const app = express();
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

app.use('/user', userRoutes);
app.use('/user', loginRoutes);
app.use('/expense', expenseRoutes);

sequelize.sync()
.then(() => {
app.listen(2000);
})
.catch(err => console.log(err));