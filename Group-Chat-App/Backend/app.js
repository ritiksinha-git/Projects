const db = require('./util/database');

// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/user')
const usersRoutes = require('./routes/user');



// Create an Express application
const app = express();

// Configure middleware
app.use(bodyParser.json());
app.use(cors());

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