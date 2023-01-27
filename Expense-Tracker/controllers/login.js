const bcrypt = require('bcrypt');
const User = require('../models/users');

exports.login = async (req, res) => {
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
        res.status(200).json({ message: 'User login successful', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in user' });
    }
};
