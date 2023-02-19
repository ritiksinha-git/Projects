// connection database
const db = require('./util/database');

// Import required packages
const express = require('express');
// Create an Express application
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

// models
const User = require('./models/user')

// routes
const usersRoutes = require('./routes/user');

// Configure middleware
app.use(bodyParser.json());
app.use(cors({
    origin:'http://127.0.0.1:5500'
}));

// Configure routes
app.use('/user', usersRoutes);

// Start the server and sync the database
db.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
 })