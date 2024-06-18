(function () {
    'use strict';

    // Function to handle signup form submission
    document.getElementById("signup-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Retrieve form data
        var username = document.getElementById("username").value,
            email = document.getElementById("email").value,
            password = document.getElementById("password").value;

        // Dummy registration logic (replace with your actual registration logic)
        var newUser = {
            username: username,
            email: email,
            password: password,
            role: 'user' // Default role for new users
        };

        // Save new user to localStorage (for simplicity)
        localStorage.setItem('newUser', JSON.stringify(newUser));

        alert("Account created successfully! You can now log in.");
        window.location.href = 'login.html';
    });
})();
