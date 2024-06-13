document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email: email,
        password: password
    };

    try {
        console.log('Loading...:', loginData);

        const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        console.log("Status:", response.status);

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error('Login failed:', errorMessage.message || errorMessage);
            document.getElementById('error-message').textContent = `Login failed: ${errorMessage.message || 'Unauthorized'}`;
            return;
        }

        const data = await response.json();
        console.log("Ma'lumotlar javobi:", data);

        if (data && data.access_token) {
            localStorage.setItem('access_token', data.access_token);
            console.log('Login qilindi.');
            window.location.href = 'admin.html';
        } else {
            console.error('Error:', data);
            document.getElementById('error-message').textContent = 'Error';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = 'Error';
    }
});
