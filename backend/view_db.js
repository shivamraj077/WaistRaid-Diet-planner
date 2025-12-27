const mongoose = require('mongoose');
const User = require('./models/User');
const HealthProfile = require('./models/HealthProfile');
const DietPlan = require('./models/DietPlan');
const dotenv = require('dotenv');

dotenv.config();

const viewData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dietplanner');
        console.log('✅ Connected to MongoDB to view data...\n');

        const users = await User.find();
        console.log('--- USERS ---');
        console.log(users.length ? users : 'No users found.');
        console.log('\n');

        const profiles = await HealthProfile.find().populate('user', 'name email');
        console.log('--- HEALTH PROFILES ---');
        console.log(profiles.length ? profiles : 'No profiles found.');
        console.log('\n');

        const plans = await DietPlan.find().populate('user', 'name email');
        console.log('--- DIET PLANS ---');
        console.log(plans.length ? plans : 'No diet plans found.');
        console.log('\n');

        process.exit();
    } catch (error) {
        console.error('Error fetching data:', error);
        process.exit(1);
    }
};

viewData();
