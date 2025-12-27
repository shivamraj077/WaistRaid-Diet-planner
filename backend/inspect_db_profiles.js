const { MongoClient } = require('mongodb');

// URI from config/db.js or env. Assuming local default for now as per previous context.
const uri = "mongodb://127.0.0.1:27017/waistraid";

async function inspectProfiles() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('dietplanner');

        console.log("--- Users ---");
        const users = await db.collection('users').find().toArray();
        users.forEach(u => console.log(`User: ${u.name} | ID: ${u._id.toString()}`));

        console.log("\n--- Health Profiles ---");
        const profiles = await db.collection('health_profiles').find().toArray();
        console.log(profiles.map(p => ({
            user: p.user,
            profileName: p.profileName,
            age: p.age
        })));

        const akash = profiles.find(p => p.profileName === 'akash sharma');
        console.log("\nFound 'akash sharma'?", !!akash);

        console.log("\n--- Diet Plans ---");
        const plans = await db.collection('dietplans').find().project({ user: 1, profileName: 1, dateGenerated: 1 }).toArray();
        console.log(plans);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

inspectProfiles();
