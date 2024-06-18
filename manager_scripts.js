document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const departments = JSON.parse(localStorage.getItem('departments')) || [];

    if (!loggedInUser || loggedInUser.role !== 'manager') {
        window.location.href = 'login.html';
    }

    const departmentForm = document.getElementById('department-form');
    const taskForm = document.getElementById('task-form');
    const departmentList = document.getElementById('department-list');
    const taskList = document.getElementById('task-list');
    const employeeList = document.getElementById('employee-list');
    const assignedToSelect = document.getElementById('assigned-to');
    const recurringTaskCheckbox = document.getElementById('recurring-task');
    const recurrenceIntervalSelect = document.getElementById('recurrence-interval');

    function loadDepartments() {
        departmentList.innerHTML = '';
        departments.forEach(department => {
            const departmentItem = document.createElement('li');
            departmentItem.textContent = department.name;
            departmentList.appendChild(departmentItem);
        });
    }

    function loadTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span>${task.title}: ${task.description} (Due: ${task.dueDate})</span>
                <div>
                    <button onclick="editTask(${task.id})">Edit</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    }

    function loadEmployees() {
        employeeList.innerHTML = '';
        assignedToSelect.innerHTML = '';
        users.forEach(user => {
            if (user.role === 'employee') {
                const employeeItem = document.createElement('li');
                employeeItem.innerHTML = `
                    <span>${user.username}</span>
                    <button onclick="moveEmployee(${user.id})">Move</button>
                    <button onclick="removeEmployee(${user.id})">Remove</button>
                `;
                employeeList.appendChild(employeeItem);

                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.username;
                assignedToSelect.appendChild(option);
            }
        });
    }

    function loadSummary() {
        const taskCompletionRateDiv = document.getElementById('task-completion-rate');
        const departmentPerformanceDiv = document.getElementById('department-performance');
        const pendingTasksDiv = document.getElementById('pending-tasks');

        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.status === 'done').length;
        const taskCompletionRate = (completedTasks / totalTasks) * 100;

        taskCompletionRateDiv.innerHTML = `<p>Task Completion Rate: ${taskCompletionRate.toFixed(2)}%</p>`;

        // Example of calculating departmental performance
        const departmentPerformance = departments.map(department => {
            const departmentTasks = tasks.filter(task => users.find(user => user.id === task.assignedTo).department === department.name);
            const completedDepartmentTasks = departmentTasks.filter(task => task.status === 'done').length;
            return {
                name: department.name,
                completionRate: (completedDepartmentTasks / departmentTasks.length) * 100
            };
        });

        departmentPerformanceDiv.innerHTML = `<p>Departmental Performance:</p>`;
        departmentPerformance.forEach(dept => {
            const deptItem = document.createElement('p');
            deptItem.textContent = `${dept.name}: ${dept.completionRate.toFixed(2)}%`;
            departmentPerformanceDiv.appendChild(deptItem);
        });

        pendingTasksDiv.innerHTML = `<p>Pending Tasks:</p>`;
        tasks.filter(task => task.status === 'pending').forEach(task => {
            const taskItem = document.createElement('p');
            taskItem.textContent = `${task.title} (Assigned to: ${users.find(user => user.id === task.assignedTo).username})`;
            pendingTasksDiv.appendChild(taskItem);
        });
    }

    departmentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const departmentName = document.getElementById('department-name').value;
        departments.push({ name: departmentName });
        localStorage.setItem('departments', JSON.stringify(departments));
        loadDepartments();
    });

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        const assignedTo = parseInt(document.getElementById('assigned-to').value);
        const dueDate = document.getElementById('task-due-date').value;
        const isRecurring = document.getElementById('recurring-task').checked;
        const recurrenceInterval = document.getElementById('recurrence-interval').value;

        const newTask = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            title,
            description,
            assignedTo,
            dueDate,
            status: 'pending',
            isRecurring,
            recurrenceInterval: isRecurring ? recurrenceInterval : null
        };

        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
        sendTaskNotification(newTask);
    });

    recurringTaskCheckbox.addEventListener('change', function() {
        recurrenceIntervalSelect.disabled = !recurringTaskCheckbox.checked;
    });

    window.editTask = function(taskId) {
        // Implement task edit functionality
    };

    window.deleteTask = function(taskId) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            loadTasks();
        }
    };

    window.moveEmployee = function(employeeId) {
        // Implement employee move functionality
    };

    window.removeEmployee = function(employeeId) {
        const userIndex = users.findIndex(user => user.id === employeeId);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            localStorage.setItem('users', JSON.stringify(users));
            loadEmployees();
        }
    };

    function sendTaskNotification(task) {
        const assignee = users.find(user => user.id === task.assignedTo);
        const manager = users.find(user => user.role === 'manager');
        fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: [assignee.email, manager.email],
                subject: 'New Task Assigned',
                text: `A new task "${task.title}" has been assigned to you and is due on ${task.dueDate}.`
            })
        });
    }

    loadDepartments();
    loadTasks();
    loadEmployees();
    loadSummary();
});
