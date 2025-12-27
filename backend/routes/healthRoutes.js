const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDb } = require('../config/db');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/health
// @desc    Create or Update health profile
router.post('/', protect, async (req, res) => {
    const { age, gender, height, weight, activityLevel, goal, profileName } = req.body;
    const pName = profileName || 'Me';
    const fs = require('fs');
    fs.appendFileSync('debug.log', `[${new Date().toISOString()}] POST /health profileName=${pName}\n`);

    try {
        const db = getDb();
        const userId = req.session.user.id;

        const updateData = {
            user: new ObjectId(userId),
            profileName: pName,
            age,
            gender,
            height,
            weight,
            activityLevel,
            goal,
            updatedAt: new Date()
        };

        const result = await db.collection('health_profiles').updateOne(
            { user: new ObjectId(userId), profileName: pName },
            { $set: updateData },
            { upsert: true }
        );

        res.status(201).json(updateData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/health/profiles
// @desc    Get all unique profile names for user
router.get('/profiles', protect, async (req, res) => {
    try {
        const db = getDb();
        const userId = req.session.user.id;
        const profiles = await db.collection('health_profiles').distinct('profileName', { user: new ObjectId(userId) });

        let cleanProfiles = [];
        if (Array.isArray(profiles)) {
            cleanProfiles = profiles.map(p => p || 'Me').filter((v, i, a) => a.indexOf(v) === i);
        } else {
            cleanProfiles = ['Me'];
        }

        res.json(cleanProfiles.length ? cleanProfiles : ['Me']);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/health
// @desc    Get current user health profile (by name)
router.get('/', protect, async (req, res) => {
    try {
        const db = getDb();
        const userId = req.session.user.id;
        const profileName = req.query.profileName || 'Me';

        const query = { user: new ObjectId(userId) };
        if (profileName === 'Me') {
            query.$or = [
                { profileName: 'Me' },
                { profileName: { $exists: false } },
                { profileName: null }
            ];
        } else {
            query.profileName = profileName;
        }

        const profile = await db.collection('health_profiles').findOne(query);

        if (!profile) {
            return res.status(404).json({ message: 'Health profile not found' });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
