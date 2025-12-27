const mongoose = require('mongoose');

const healthProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    height: { type: Number, required: true }, // in cm
    weight: { type: Number, required: true }, // in kg
    activityLevel: {
        type: String,
        enum: ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'super_active'],
        required: true
    },
    goal: {
        type: String,
        enum: ['weight_loss', 'weight_gain', 'maintenance'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('HealthProfile', healthProfileSchema);
