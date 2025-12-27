const testRegister = async () => {
    try {
        console.log('Attempting to register user...');
        const res = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test_script@example.com',
                password: 'password123'
            })
        });

        if (res.ok) {
            const data = await res.json();
            console.log('✅ Registration Successful!');
            console.log('Response:', data);
        } else {
            const err = await res.text();
            console.error('❌ Registration Failed');
            console.error('Status:', res.status);
            console.error('Response:', err);
        }
    } catch (error) {
        console.error('❌ Network Error (Is Server Running?)');
        console.error('Error:', error.message);
    }
};

testRegister();
