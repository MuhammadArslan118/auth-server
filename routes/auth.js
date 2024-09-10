const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;

    try {
        // Check if email or username already exists
        const existingUser = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingUser) return res.status(400).json({ message: 'Email already exists' });
        if (existingUsername) return res.status(400).json({ message: 'Username already exists' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            email,
            username,
            firstName,
            lastName,
            password: hashedPassword,
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});


// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;
