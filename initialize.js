document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Fetch users from JSON Placeholder and store them in local storage
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            const formattedUsers = users.map(user => ({
                id: user.id,
                username: `user${user.id}`,
                email: user.email,
                password: 'password',
                role: user.id === 1 ? 'manager' : 'employee'
            }));
            localStorage.setItem('users', JSON.stringify(formattedUsers));
        });

    // Fetch tasks from JSON Placeholder and store them in local storage
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(tasks => {
            const formattedTasks = tasks.slice(0, 10).map(task => ({
                id: task.id,
                title: task.title,
                description: 'Description',
                assignedTo: task.userId,
                dueDate: new Date(Date.now() + (Math.random() * 7 + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                status: task.completed ? 'done' : 'pending',
                isRecurring: false,
                recurrenceInterval: null // e.g., 'daily', 'weekly'
            }));
            localStorage.setItem('tasks', JSON.stringify(formattedTasks));
        });
});
