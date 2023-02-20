const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Controller for user sign up
const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if a user with the same email already exists in the database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash and salt the user's password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      name,
      email,
      number: phone,
      password: hashedPassword,
    });
    

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const accessToken = (id, name) => {
  return jwt.sign({ userId: id, name }, process.env.SECRET_KEY);
}


const login = async (req, res) => {
  try {
      // Get user input
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'User not authorized' });
      }
      // Send response
      return res.status(200).json({success: true, message: "User logged in successfully", token: accessToken(user.id, user.name, user.ispremiumuser)})

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging in user' });
  }
};


module.exports = {
  signup,
  login,
  accessToken
}