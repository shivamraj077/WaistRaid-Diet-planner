// using native fetch
const BASE_URL = 'http://localhost:5000/api';

async function testSpecificProfile() {
    const jar = new Map();
    let cookie = '';

    console.log('--- 1. Logging in ---');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: 'password123' })
    });

    if (loginRes.ok) {
        const setCookie = loginRes.headers.get('set-cookie');
        if (setCookie) cookie = setCookie.split(';')[0];
        console.log('✅ Login Successful');
    } else {
        // Try register
        console.log('Login failed, trying register...');
        const regRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test User', email: 'test@example.com', password: 'password123' })
        });
        if (regRes.ok) {
            const setCookie = regRes.headers.get('set-cookie');
            if (setCookie) cookie = setCookie.split(';')[0];
            console.log('✅ Register Successful');
        } else {
            console.error('❌ Auth failed');
            return;
        }
    }

    const headers = {
        'Content-Type': 'application/json',
        'Cookie': cookie
    };

    // 2. Create Profile "akash sharma"
    const profileName = 'akash sharma';
    console.log(`\n--- 2. Creating New Profile "${profileName}" ---`);
    const createRes = await fetch(`${BASE_URL}/health`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            profileName: profileName,
            age: 28, gender: 'male', height: 180, weight: 75, activityLevel: 'active', goal: 'maintenance'
        })
    });
    console.log('Create Status:', createRes.status);
    if (!createRes.ok) console.log(await createRes.text());

    // 3. Verify in List
    console.log('\n--- 3. Verifying Profile in List ---');
    const listRes = await fetch(`${BASE_URL}/health/profiles`, { headers });
    const profiles = await listRes.json();
    console.log('Profiles Content:', JSON.stringify(profiles));

    if (Array.isArray(profiles) && profiles.includes(profileName)) {
        console.log(`✅ "${profileName}" found in profile list.`);
    } else {
        console.error(`❌ "${profileName}" NOT found. List: ${JSON.stringify(profiles)}`);
        // Maybe casing issue?
        const match = profiles.find(p => p.toLowerCase() === profileName.toLowerCase());
        if (match) console.log(`⚠️ Found case-insensitive match: "${match}"`);
    }
}

testSpecificProfile();
