const mongoose = require('mongoose');
const User = require('./models/User');
const Recipe = require('./models/Recipe');
const DietPlan = require('./models/DietPlan');

const mongoURI = 'mongodb://127.0.0.1:27017/dietplanner';

const inspect = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log(`\n✅ Connected to MongoDB at ${mongoURI}\n`);

        const userCount = await User.countDocuments();
        console.log(`👤 Users: ${userCount}`);
        if (userCount > 0) {
            const u = await User.findOne().select('name email');
            console.log(`   Sample: ${u.name} (${u.email})`);
        }

        const recipeCount = await Recipe.countDocuments();
        console.log(`\n🍛 Recipes: ${recipeCount}`);
        if (recipeCount > 0) {
            const r = await Recipe.findOne().select('name type calories');
            console.log(`   Sample: ${r.name} - ${r.type} (${r.calories} kcal)`);
        }

        const planCount = await DietPlan.countDocuments();
        console.log(`\n📋 Diet Plans: ${planCount}`);

        console.log('\n-----------------------------------');
        console.log('To view this data in a GUI, we recommend installing "MongoDB Compass"');
        console.log('and connecting to: mongodb://127.0.0.1:27017/dietplanner');
        console.log('-----------------------------------\n');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

inspect();
