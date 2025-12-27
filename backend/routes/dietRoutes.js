const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDb } = require('../config/db');
const { calculateBMI, calculateDailyCalories, calculateBMR, generateDietPlan } = require('../utils/nutritionLogic');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/diet/generate
// @desc    Generate a new diet plan based on health profile
router.post('/generate', protect, async (req, res) => {
    try {
        const db = getDb();
        const userId = req.session.user.id;
        const profileName = req.body.profileName || 'Me';

        // Fetch health profile
        const profile = await db.collection('health_profiles').findOne({
            user: new ObjectId(userId),
            profileName: profileName
        });

        if (!profile) {
            return res.status(404).json({ message: 'Please create a health profile first' });
        }

        const bmr = calculateBMR(profile.gender, profile.weight, profile.height, profile.age);
        const dailyCalories = calculateDailyCalories(bmr, profile.activityLevel, profile.goal);
        const bmi = calculateBMI(profile.weight, profile.height);
        const plan = generateDietPlan(dailyCalories, profile.goal);

        const newDietPlan = {
            user: new ObjectId(userId),
            profileName: profileName,
            bmi,
            dailyCalories,
            plan,
            dateGenerated: new Date()
        };

        const result = await db.collection('dietplans').insertOne(newDietPlan);

        res.status(201).json({ ...newDietPlan, _id: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/diet
// @desc    Get user's diet history (by profile)
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

        const plans = await db.collection('dietplans')
            .find(query)
            .sort({ dateGenerated: -1 })
            .toArray();

        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
