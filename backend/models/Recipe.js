const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    type: {
        type: String, // breakfast, lunch, dinner
        required: true,
        enum: ['breakfast', 'lunch', 'dinner']
    },
    goal: {
        type: String, // weight_loss, weight_gain, maintenance
        required: true,
        enum: ['weight_loss', 'weight_gain', 'maintenance']
    },
    time: {
        type: String, // e.g., "15 mins"
        required: true
    },
    image: {
        type: String, // URL or placeholder
        default: 'https://via.placeholder.com/300?text=Healthy+Recipe'
    },
    ingredients: [String],
    instructions: [String]
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
