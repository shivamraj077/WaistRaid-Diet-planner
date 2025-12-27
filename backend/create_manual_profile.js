const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017/dietplanner";

async function createProfile() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db();

        // 1. Find ALL Users
        const users = await db.collection('users').find({}).toArray();
        if (users.length === 0) {
            console.error('❌ No users found in DB!');
            return;
        }
        console.log(`✅ Found ${users.length} Users`);

        for (const user of users) {
            console.log(`Processing User: ${user.name} (${user.email})`);

            // 2. Define Profile
            const newProfile = {
                user: user._id,
                profileName: 'Akash Sharma',
                age: 28,
                gender: 'male',
                height: 175,
                weight: 75,
                activityLevel: 'moderately_active',
                goal: 'muscle_gain',
                updatedAt: new Date()
            };

            // 3. Upsert Profile
            const result = await db.collection('health_profiles').updateOne(
                { user: user._id, profileName: 'Akash Sharma' },
                { $set: newProfile },
                { upsert: true }
            );
            console.log(`   -> Profile 'Akash Sharma' linked/updated.`);
        }

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

createProfile();
