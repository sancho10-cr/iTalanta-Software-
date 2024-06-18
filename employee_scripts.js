document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const taskList = document.getElementById('task-list');

    if (!loggedInUser) {
        window.location.href = 'login.html'; // Redirect to login if not logged in
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';

        tasks.forEach(task => {
            if (task.assignedTo === loggedInUser.id) {
                const taskItem = document.createElement('li');
                taskItem.innerHTML = `
                    <span>${task.title}: ${task.description}</span>
                    <div>
                        <button onclick="updateTaskStatus(${task.id}, 'in progress')">In Progress</button>
                        <button onclick="updateTaskStatus(${task.id}, 'done')">Done</button>
                    </div>
                `;
                taskList.appendChild(taskItem);
            }
        });
    }

    window.updateTaskStatus = function(taskId, status) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.findIndex(task => task.id === taskId);

        if (taskIndex !== -1) {
            if (status === 'done') {
                tasks.splice(taskIndex, 1); // Remove task if done
            } else {
                tasks[taskIndex].status = status; // Update task status
            }

            localStorage.setItem('tasks', JSON.stringify(tasks));
            loadTasks();
        }
    };

    loadTasks();
});
