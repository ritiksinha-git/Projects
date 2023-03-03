const dotenv = require('dotenv');
dotenv.config();

// connection database
const db = require('./Backend/util/database');

// Import required packages
const express = require('express');
// Create an Express application
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

// models
const User = require('./Backend/models/user');
const Message = require('./Backend/models/message');

// routes
const usersRoutes = require('./Backend/routes/users');
const chat = require('./Backend/routes/chats')

// Configure middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

// Configure routes
app.use('/user', usersRoutes);
app.use('/message', chat)

User.hasMany(Message);
Message.belongsTo(User);

// Start the server and sync the database
db.sync()
// db.sync({force:true})
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
 })