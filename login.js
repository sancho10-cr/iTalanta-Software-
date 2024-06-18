document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            if (user.role === 'employee') {
                window.location.href = 'employee_dashboard.html';
            } else if (user.role === 'manager') {
                window.location.href = 'manager_dashboard.html';
            }
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });
});
