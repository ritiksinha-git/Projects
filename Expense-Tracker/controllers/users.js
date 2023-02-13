const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
  try {
    // Get user input
    const { name, email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // Send response
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

const accessToken = (id,name, ispremiumuser) => {
  return jwt.sign({userId : id, name:name, ispremiumuser},  process.env.SECRET_KEY)
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