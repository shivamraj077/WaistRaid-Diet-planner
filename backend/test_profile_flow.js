// using native fetch
const BASE_URL = 'http://localhost:5000/api';

async function testNewProfileFlow() {
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
        // Try register if login fails
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

    // 2. Create New Face "Kid"
    const profileName = 'Kid ' + Date.now(); // Unique name
    console.log(`\n--- 2. Creating New Profile "${profileName}" ---`);
    const createRes = await fetch(`${BASE_URL}/health`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            profileName: profileName,
            age: 12, gender: 'male', height: 150, weight: 45, activityLevel: 'active', goal: 'maintenance'
        })
    });
    console.log('Create Status:', createRes.status);
    if (!createRes.ok) console.log(await createRes.text());

    // 3. Verify in List
    console.log('\n--- 3. Verifying Profile in List ---');
    const listRes = await fetch(`${BASE_URL}/health/profiles`, { headers });
    const profiles = await listRes.json();
    console.log('Profiles Type:', typeof profiles);
    console.log('Profiles Content:', profiles);
    if (Array.isArray(profiles) && profiles.includes(profileName)) {
        console.log(`✅ "${profileName}" found in profile list.`);
    } else {
        console.error(`❌ "${profileName}" NOT found in list. Got:`, profiles);
    }

    // 4. Generate Diet for "Kid"
    console.log(`\n--- 4. Generate Diet for "${profileName}" ---`);
    const genRes = await fetch(`${BASE_URL}/diet/generate`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ profileName: profileName })
    });
    console.log('Generate Status:', genRes.status);
    if (!genRes.ok) console.log(await genRes.text());

    // 5. Check History for "Kid"
    console.log(`\n--- 5. Check History for "${profileName}" ---`);
    const histRes = await fetch(`${BASE_URL}/diet?profileName=${encodeURIComponent(profileName)}`, { headers });
    const history = await histRes.json();
    console.log('History Count:', history.length);
    if (history.length > 0) {
        console.log(`✅ History found for "${profileName}". First item profileName: "${history[0].profileName}"`);
    } else {
        console.error(`❌ No history found for "${profileName}".`);
    }
}

testNewProfileFlow();
