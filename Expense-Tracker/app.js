const db = require('./util/database');
const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression')
const morgan = require('morgan')
const fs = require('fs');

// get config vars
dotenv.config();

const User = require('./models/users');
const Expense = require('./models/expense');
const Order = require('./models/orders');
const Forgotpassword = require('./models/forgotpassword');

const userRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase')
const premiumF = require('./routes/premiumF')
const resetPasswordRoutes = require('./routes/resetpassword')

var cors = require('cors');

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    {flags: 'a'}
);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(helmet());
app.use(compression());
app.use(morgan('combined', {stream: accessLogStream}));


app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes)
app.use('/premium', premiumF);
app.use('/password', resetPasswordRoutes);
app.use('/user', expenseRoutes);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User)

db.sync()
    .then(() => {
        app.listen(process.env.PORT || 2000);
    })
    .catch(err => {
        console.log(err);
 })