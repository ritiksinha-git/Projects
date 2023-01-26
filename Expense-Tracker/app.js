const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const sequelize = require('./util/database');
const User = require('./models/users');
const app = express();
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

app.use('/user', userRoutes);

sequelize.sync()
.then(result => {
    app.listen(2000);
})
.catch(err => console.log(err));
