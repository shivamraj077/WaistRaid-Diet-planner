const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const recipes = [
    {
        name: "Avocado & Egg Toast",
        calories: 350,
        type: "breakfast",
        goal: "weight_loss",
        time: "10 mins",
        image: "https://images.unsplash.com/photo-1525351484163-7529414395d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        ingredients: ["1 slice whole grain bread", "1/2 avocado", "1 egg", "Red pepper flakes"],
        instructions: ["Toast bread", "Mash avocado", "Fry or poach egg", "Assemble"]
    },
    {
        name: "Oatmeal with Berries",
        calories: 300,
        type: "breakfast",
        goal: "weight_loss",
        time: "10 mins",
        image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        ingredients: ["1/2 cup oats", "1 cup almond milk", "Blueberries", "Honey"],
        instructions: ["Boil oats", "Top with berries"]
    },
    {
        name: "Grilled Chicken Salad",
        calories: 450,
        type: "lunch",
        goal: "weight_loss",
        time: "20 mins",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        ingredients: ["Chicken Breast", "Lettuce", "Cucumber", "Vinaigrette"],
        instructions: ["Grill chicken", "Chop veggies", "Mix"]
    },
    {
        name: "Quinoa Veggie Bowl",
        calories: 400,
        type: "lunch",
        goal: "weight_loss",
        time: "25 mins",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        ingredients: ["Quinoa", "Black beans", "Corn", "Salsa"],
        instructions: ["Cook quinoa", "Mix ingredients"]
    },
    {
        name: "Baked Salmon & Asparagus",
        calories: 500,
        type: "dinner",
        goal: "weight_loss",
        time: "30 mins",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a7270028d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        ingredients: ["Salmon fillet", "Asparagus bundle", "Lemon", "Olive oil"],
        instructions: ["Bake at 400F for 15 mins"]
    },
    {
        name: "Protein Pancakes",
        calories: 600,
        type: "breakfast",
        goal: "weight_gain",
        time: "20 mins",
        image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        ingredients: ["Oats", "Banana", "Protein powder", "Eggs"],
        instructions: ["Blend ingredients", "Cook on skillet"]
    },
    {
        name: "Chicken Pasta Alfredo",
        calories: 800,
        type: "lunch",
        goal: "weight_gain",
        time: "30 mins",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        ingredients: ["Pasta", "Chicken", "Cream", "Parmesan"],
        instructions: ["Boil pasta", "Cook chicken in sauce"]
    },
    {
        name: "Steak & Potatoes",
        calories: 850,
        type: "dinner",
        goal: "weight_gain",
        time: "40 mins",
        image: "https://images.unsplash.com/photo-1600891965590-ec884ce04849?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        ingredients: ["Steak", "Potatoes", "Butter", "Rosemary"],
        instructions: ["Sear steak", "Roast potatoes"]
    },
    {
        name: "Greek Yogurt Parfait",
        calories: 400,
        type: "breakfast",
        goal: "maintenance",
        time: "5 mins",
        image: "https://images.unsplash.com/photo-1488477181946-6428a029177b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        ingredients: ["Greek Yogurt", "Granola", "Honey", "Fruit"],
        instructions: ["Layer ingredients in a cup"]
    },
    {
        name: "Turkey Sandwich",
        calories: 500,
        type: "lunch",
        goal: "maintenance",
        time: "10 mins",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        ingredients: ["Bread", "Turkey", "Cheese", "Lettuce"],
        instructions: ["Assemble sandwich"]
    }
];

const seedDB = async () => {
    try {
        const client = await MongoClient.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dietplanner');
        console.log('Connected to DB...');
        const db = client.db();

        await db.collection('recipes').deleteMany({});
        console.log('Cleared existing recipes...');

        await db.collection('recipes').insertMany(recipes);
        console.log('✅ Seeded ' + recipes.length + ' recipes!');

        client.close();
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDB();
