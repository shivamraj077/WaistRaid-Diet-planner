const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDb } = require('../config/db');

// @route   GET /api/recipes
// @desc    Get all recipes with optional filters
router.get('/', async (req, res) => {
    try {
        const { type, goal, search } = req.query;
        let query = {};

        if (type && type !== 'all') query.type = type;
        if (goal && goal !== 'all') query.goal = goal;
        if (search) query.name = { $regex: search, $options: 'i' };

        const db = getDb();
        const recipes = await db.collection('recipes').find(query).toArray();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/recipes/:id
// @desc    Get single recipe
router.get('/:id', async (req, res) => {
    try {
        const db = getDb();
        const recipe = await db.collection('recipes').findOne({ _id: new ObjectId(req.params.id) });
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/recipes/save/:id
// @desc    Save a recipe to user profile
router.post('/save/:id', async (req, res) => {
    if (!req.session.user) return res.status(401).json({ message: 'Not authorized' });

    try {
        const db = getDb();
        const userId = new ObjectId(req.session.user.id);
        const recipeId = req.params.id; // Store as string or ObjectId depending on preference. Mongoose stored as ObjectId. Let's start with String ID for simplicity in checking includes, or convert to ObjectId if we want strict reference.
        // Assuming recipeId is a valid ObjectId string.

        await db.collection('users').updateOne(
            { _id: userId },
            { $addToSet: { savedRecipes: recipeId } } // $addToSet prevents duplicates automatically
        );

        // Return updated list
        const user = await db.collection('users').findOne({ _id: userId });
        res.json(user.savedRecipes || []);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/recipes/unsave/:id
// @desc    Remove a recipe from user profile
router.post('/unsave/:id', async (req, res) => {
    if (!req.session.user) return res.status(401).json({ message: 'Not authorized' });

    try {
        const db = getDb();
        const userId = new ObjectId(req.session.user.id);
        const recipeId = req.params.id;

        await db.collection('users').updateOne(
            { _id: userId },
            { $pull: { savedRecipes: recipeId } }
        );

        const user = await db.collection('users').findOne({ _id: userId });
        res.json(user.savedRecipes || []);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/recipes/user/saved
// @desc    Get user's saved recipes
router.get('/user/saved', async (req, res) => {
    if (!req.session.user) return res.status(401).json({ message: 'Not authorized' });

    try {
        const db = getDb();
        const userId = new ObjectId(req.session.user.id);
        const user = await db.collection('users').findOne({ _id: userId });

        if (!user || !user.savedRecipes || user.savedRecipes.length === 0) {
            return res.json([]);
        }

        // savedRecipes is an array of ID strings (or ObjectIds)
        // We need to fetch the actual recipes.
        // If they are stored as strings:
        const recipeIds = user.savedRecipes.map(id => new ObjectId(id));
        const recipes = await db.collection('recipes').find({ _id: { $in: recipeIds } }).toArray();

        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
