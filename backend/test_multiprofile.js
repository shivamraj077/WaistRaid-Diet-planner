// using native fetch


const BASE_URL = 'http://localhost:5000/api';
// We need a session, so we need to login first. 
// This script assumes server is running and we can use a test user.

async function testMultiProfile() {
    // 1. Register/Login
    const jar = new Map(); // Mock cookie jar
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

    // 2. Create Profile "Dad"
    console.log('\n--- 2. Creating Profile "Dad" ---');
    const dadRes = await fetch(`${BASE_URL}/health`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            profileName: 'Dad',
            age: 50, gender: 'male', height: 180, weight: 85, activityLevel: 'active', goal: 'weight_loss'
        })
    });
    console.log('Create Dad:', dadRes.status);

    // 3. Create Profile "Mom"
    console.log('\n--- 3. Creating Profile "Mom" ---');
    const momRes = await fetch(`${BASE_URL}/health`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            profileName: 'Mom',
            age: 48, gender: 'female', height: 165, weight: 65, activityLevel: 'moderate', goal: 'maintenance'
        })
    });
    console.log('Create Mom:', momRes.status);

    // 4. List Profiles
    console.log('\n--- 4. Listing Profiles ---');
    const listRes = await fetch(`${BASE_URL}/health/profiles`, { headers });
    const profiles = await listRes.json();
    console.log('Profiles:', profiles);

    if (profiles.includes('Dad') && profiles.includes('Mom')) {
        console.log('✅ Profiles listed correctly');
    } else {
        console.error('❌ Profiles list mismatch');
    }

    // 5. Generate Diet for Dad
    console.log('\n--- 5. Generate Diet for Dad ---');
    const dietDadRes = await fetch(`${BASE_URL}/diet/generate`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ profileName: 'Dad' })
    });
    console.log('Dad Diet Status:', dietDadRes.status);

    // 6. Fetch Dad's Diet History
    console.log('\n--- 6. Fetch Dad History ---');
    const historyDadRes = await fetch(`${BASE_URL}/diet?profileName=Dad`, { headers });
    const dadHistory = await historyDadRes.json();
    console.log('Dad History Count:', dadHistory.length);
    if (dadHistory.length > 0 && dadHistory[0].profileName === 'Dad') {
        console.log('✅ Dad history verification passed');
    }

    // 7. Fetch Mom's Diet History (Should be empty initially?)
    console.log('\n--- 7. Fetch Mom History ---');
    const historyMomRes = await fetch(`${BASE_URL}/diet?profileName=Mom`, { headers });
    const momHistory = await historyMomRes.json();
    console.log('Mom History Count:', momHistory.length); // Should be 0 if we didn't generate one

}

testMultiProfile();
