const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { getDb } = require('../config/db');

const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

// @route   POST /api/auth/register
// @desc    Register user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const db = getDb();
        const existingUser = await db.collection('users').findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = {
            name,
            email,
            password: hashPassword(password),
            createdAt: new Date(),
            savedRecipes: [] // Initialize empty array for recipes
        };

        const result = await db.collection('users').insertOne(newUser);

        // MongoDB driver insertOne return structure: result.insertedId
        if (result.acknowledged) {
            const userId = result.insertedId;
            req.session.user = { id: userId.toString(), name, email };
            res.status(201).json({
                _id: userId,
                name,
                email
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = getDb();
        const user = await db.collection('users').findOne({ email });

        if (user && user.password === hashPassword(password)) {
            // Store ID as string in session to be safe
            req.session.user = { id: user._id.toString(), name: user.name, email: user.email };
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/auth/logout
// @desc    Logout user
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
    });
});

// @route   GET /api/auth/me
// @desc    Get current user
router.get('/me', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ message: 'Not authorized' });
    }
});

module.exports = router;
