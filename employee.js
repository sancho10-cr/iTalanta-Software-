'use strict';

// Function to retrieve and display tasks from localStorage
function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ''; // Clear existing task list
    tasks.forEach(task => {
        const taskElement = document.createElement("li");
        taskElement.textContent = task.taskName;
        taskElement.dataset.status = task.status; // Store task status as a data attribute
        if (task.status === 'done') {
            taskElement.classList.add('done'); // Apply 'done' class for completed tasks
        }
        taskElement.addEventListener('click', () => {
            // Toggle task status between 'done' and 'in progress'
            task.status = task.status === 'done' ? 'in progress' : 'done';
            taskElement.dataset.status = task.status;
            taskElement.classList.toggle('done');
            // Update localStorage with the updated task status
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
        taskList.appendChild(taskElement);
    });
}

// Event listener for DOMContentLoaded event to display tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayTasks();
});
