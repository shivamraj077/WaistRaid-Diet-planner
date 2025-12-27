const mongoose = require('mongoose');

const dietPlanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateGenerated: {
        type: Date,
        default: Date.now
    },
    bmi: Number,
    dailyCalories: Number,
    plan: {
        breakfast: {
            title: String,
            calories: Number,
            description: String,
            tips: [String]
        },
        lunch: {
            title: String,
            calories: Number,
            description: String,
            tips: [String]
        },
        dinner: {
            title: String,
            calories: Number,
            description: String,
            tips: [String]
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('DietPlan', dietPlanSchema);
