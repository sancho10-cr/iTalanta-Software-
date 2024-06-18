(function () {
    'use strict';

    // Check if there's an admin user in localStorage
    var adminUser = localStorage.getItem('adminUser');

    // Function to handle login form submission
    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Retrieve username and password from form inputs
        var username = document.getElementById("username").value,
            password = document.getElementById("password").value;

        // Dummy check for admin login (replace with your actual authentication logic)
        if (username === "admin" && password === "admin123") {
            // Set adminUser flag in localStorage
            localStorage.setItem('adminUser', username);

            // Redirect to manager dashboard or employee dashboard based on role
            window.location.href = 'manager_dashboard.html';
        } else {
            alert("Invalid username or password. Please try again.");
        }
    })();
})();
