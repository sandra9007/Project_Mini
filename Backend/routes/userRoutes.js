const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No data provided' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender,
            birthDate: req.body.birthDate,
            country: req.body.country,
            state: req.body.state,
            district: req.body.district,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error in user registration:', error.message);

        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        res.status(500).json({ message: 'An error occurred during user registration' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, 'KH_secret_key', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error in login:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
