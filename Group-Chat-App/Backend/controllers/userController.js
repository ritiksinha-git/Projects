const bcrypt = require('bcrypt');
const User = require('../models/user');

// Controller for user sign up
exports.signup = async (req, res) => {
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
