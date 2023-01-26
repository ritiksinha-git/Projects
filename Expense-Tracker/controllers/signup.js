const User = require('../models/users');

exports.signup = async (req, res) => {
    try {
        // Get user input
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        
        // Create new user
        const user = await User.create({
            name,
            email,
            password,
        });
        
        // Send response
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating user' });
    }
};
