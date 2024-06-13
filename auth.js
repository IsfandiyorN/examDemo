document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email: email,
        password: password
    };

    try {
        console.log('Attempting to log in with credentials:', loginData);

        const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error('Login failed:', errorMessage.message || errorMessage);
            document.getElementById('error-message').textContent = `Login failed: ${errorMessage.message || 'Unauthorized'}`;
            return;
        }

        const data = await response.json();
        console.log('Response data:', data);

        if (data && data.access_token) {
            localStorage.setItem('access_token', data.access_token);
            console.log('Login successful, redirecting to admin page.');
            window.location.href = 'admin.html';
        } else {
            console.error('Invalid response format:', data);
            document.getElementById('error-message').textContent = 'Invalid login response.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = 'An error occurred. Please try again later.';
    }
});
