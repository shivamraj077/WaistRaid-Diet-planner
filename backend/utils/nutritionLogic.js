const calculateBMI = (weight, height) => {
    // weight in kg, height in cm
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
};

const calculateBMR = (gender, weight, height, age) => {
    // Mifflin-St Jeor Equation
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (gender === 'male') {
        bmr += 5;
    } else {
        bmr -= 161;
    }
    return bmr;
};

const calculateDailyCalories = (bmr, activityLevel, goal) => {
    const activityMultipliers = {
        sedentary: 1.2,
        lightly_active: 1.375,
        moderately_active: 1.55,
        very_active: 1.725,
        super_active: 1.9
    };

    let maintenanceCalories = bmr * (activityMultipliers[activityLevel] || 1.2);

    if (goal === 'weight_loss') return Math.round(maintenanceCalories - 500);
    if (goal === 'weight_gain') return Math.round(maintenanceCalories + 500);
    return Math.round(maintenanceCalories);
};

const generateDietPlan = (calories, goal) => {
    // 30% Breakfast, 40% Lunch, 30% Dinner
    const breakfastCals = Math.round(calories * 0.3);
    const lunchCals = Math.round(calories * 0.4);
    const dinnerCals = Math.round(calories * 0.3);

    let plan = {
        breakfast: { title: '', calories: breakfastCals, description: '', tips: [] },
        lunch: { title: '', calories: lunchCals, description: '', tips: [] },
        dinner: { title: '', calories: dinnerCals, description: '', tips: [] }
    };

    if (goal === 'weight_loss') {
        plan.breakfast = {
            title: "Energizing Oatmeal Bowl",
            calories: breakfastCals,
            description: "Steel-cut oats topped with fresh berries, flaxseeds, and a dollop of greek yogurt.",
            tips: ["Rich in fiber to keep you full longer.", "Use water or almond milk instead of whole milk."]
        };
        plan.lunch = {
            title: "Grilled Chicken Power Salad",
            calories: lunchCals,
            description: "Grilled chicken breast over mixed greens, cherry tomatoes, cucumber, and quinoa with lemon vinaigrette.",
            tips: ["High protein helps maintain muscle mass while losing fat.", "Watch the dressing portion size."]
        };
        plan.dinner = {
            title: "Simmered Veggies & Lean Protein",
            calories: dinnerCals,
            description: "Steamed broccoli, carrots, and sweet potato served with baked cod or tofu.",
            tips: ["Easy to digest for better sleep.", "Avoid heavy carbs late at night."]
        };
    } else if (goal === 'weight_gain') {
        plan.breakfast = {
            title: "Avocado & Egg Power Toast",
            calories: breakfastCals,
            description: "Two slices of whole grain toast loaded with mashed avocado, poached eggs, and hemp seeds.",
            tips: ["Healthy fats from avocado help reach calorie goals.", "Add a side of fruit juice."]
        };
        plan.lunch = {
            title: "Hearty Pasta Bolognese",
            calories: lunchCals,
            description: "Whole wheat pasta with a rich meat or lentil sauce, sprinkled with parmesan cheese.",
            tips: ["Calorie dense and filling.", "Add extra olive oil for healthy calories."]
        };
        plan.dinner = {
            title: "Loaded Rice Bowl",
            calories: dinnerCals,
            description: "Brown rice bowl topped with black beans, corn, grilled steak or tempeh, and guacamole.",
            tips: ["Great mix of carbs and protein for recovery.", "Eat until satisfied, don't overstuff."]
        };
    } else {
        plan.breakfast = {
            title: "Classic Scramble & Toast",
            calories: breakfastCals,
            description: "Scrambled eggs with spinach and mushrooms, served with a slice of whole wheat toast.",
            tips: ["Balanced start to the day.", "Add a fruit on the side."]
        };
        plan.lunch = {
            title: "Turkey Club Sandwich",
            calories: lunchCals,
            description: "Turkey breast, lettuce, tomato, and avocado on whole grain bread with a side of soup.",
            tips: ["Lean protein and veggies.", "Choose low-sodium soup."]
        };
        plan.dinner = {
            title: "Grilled Fish & Asparagus",
            calories: dinnerCals,
            description: "Grilled salmon or white fish seasoned with herbs, served with roasted asparagus and potatoes.",
            tips: ["Omega-3 fatty acids are great for brain health.", "Baking or grilling is healthier than frying."]
        };
    }

    return plan;
};

module.exports = { calculateBMI, calculateDailyCalories, calculateBMR, generateDietPlan };
