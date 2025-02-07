// Example mock credentials
const validUsername = "gelo123";
const validPassword = "gelo123";

// Handle form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from refreshing the page
    
    // Get user input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the username and password match
    if (username === validUsername && password === validPassword) {
        // Save login state (e.g., using localStorage or sessionStorage)
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);

        // Redirect to homepage or a user dashboard (or any page after login)
        window.location.href = 'website.html'; // Change this to your desired post-login page
    } else {
        alert('Invalid credentials! Please try again.');
    }
});

