document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let departments = [];
    let tasks = [];
    let employees = [
        { id: 1, name: 'santos okello' },
        { id: 2, name: 'Jane wambui' },
        // Add more employees as needed
    ];

    function createDepartment(departmentName) {
        departments.push({ id: departments.length + 1, name: departmentName, employees: [] });
        renderDepartments();
    }

    function createTask(taskTitle, taskDescription, assignedTo) {
        tasks.push({ id: tasks.length + 1, title: taskTitle, description: taskDescription, assignedTo: assignedTo, status: 'in progress' });
        renderTasks();
    }

    function editTask(taskId) {
        let task = tasks.find(task => task.id === taskId);
        if (task) {
            let newTitle = prompt("Enter new task title:", task.title);
            let newDescription = prompt("Enter new task description:", task.description);
            let newAssignedTo = prompt("Enter new assignee:", task.assignedTo);
            if (newTitle && newDescription && newAssignedTo) {
                task.title = newTitle;
                task.description = newDescription;
                task.assignedTo = newAssignedTo;
                renderTasks();
            }
        }
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    }

    function moveEmployee(employeeId, newDepartmentId) {
        let employee = employees.find(emp => emp.id === employeeId);
        if (employee) {
            departments.forEach(dept => {
                dept.employees = dept.employees.filter(empId => empId !== employeeId);
            });
            let newDepartment = departments.find(dept => dept.id === newDepartmentId);
            if (newDepartment) {
                newDepartment.employees.push(employeeId);
            }
            renderDepartments();
        }
    }

    function removeEmployee(employeeId) {
        employees = employees.filter(emp => emp.id !== employeeId);
        departments.forEach(dept => {
            dept.employees = dept.employees.filter(empId => empId !== employeeId);
        });
        renderDepartments();
        renderEmployees();
    }

    function renderDepartments() {
        let departmentsSection = document.getElementById('department-list');
        departmentsSection.innerHTML = '';
        departments.forEach(department => {
            let departmentDiv = document.createElement('div');
            departmentDiv.classList.add('department');
            departmentDiv.innerHTML = `
                <h3>${department.name}</h3>
                <button onclick="removeDepartment(${department.id})">Remove Department</button>
                <ul>
                    ${department.employees.map(empId => {
                        let employee = employees.find(emp => emp.id === empId);
                        return `<li>${employee ? employee.name : ''}</li>`;
                    }).join('')}
                </ul>
            `;
            departmentsSection.appendChild(departmentDiv);
        });
    }

    function renderTasks() {
        let tasksSection = document.getElementById('task-list');
        tasksSection.innerHTML = '';
        tasks.forEach(task => {
            let taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Assigned to: ${task.assignedTo}</p>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            `;
            tasksSection.appendChild(taskDiv);
        });
    }

    function renderEmployees() {
        let employeesSection = document.getElementById('employee-list');
        employeesSection.innerHTML = '';
        employees.forEach(employee => {
            let employeeDiv = document.createElement('div');
            employeeDiv.classList.add('employee');
            employeeDiv.innerHTML = `
                <h3>${employee.name}</h3>
                <button onclick="removeEmployee(${employee.id})">Remove</button>
                <select onchange="moveEmployee(${employee.id}, this.value)">
                    <option value="">Move to Department</option>
                    ${departments.map(dept => `<option value="${dept.id}">${dept.name}</option>`).join('')}
                </select>
            `;
            employeesSection.appendChild(employeeDiv);
        });
    }

    document.getElementById('department-form').addEventListener('submit', function(event) {
        event.preventDefault();
        let departmentName = document.getElementById('department-name').value.trim();
        if (departmentName) {
            createDepartment(departmentName);
            document.getElementById('department-name').value = '';
        } else {
            alert('Please enter a department name.');
        }
    });

    document.getElementById('task-form').addEventListener('submit', function(event) {
        event.preventDefault();
        let taskTitle = document.getElementById('task-title').value.trim();
        let taskDescription = document.getElementById('task-description').value.trim();
        let assignedTo = document.getElementById('assigned-to').value.trim();
        if (taskTitle && taskDescription && assignedTo) {
            createTask(taskTitle, taskDescription, assignedTo);
            document.getElementById('task-title').value = '';
            document.getElementById('task-description').value = '';
            document.getElementById('assigned-to').value = '';
        } else {
            alert('Please fill in all task details.');
        }
    });

    renderDepartments();
    renderTasks();
    renderEmployees();
});

// employeee js codes Example for creating a task, assuming tasks are stored in localStorage
function createTask(taskTitle, taskDescription, assignedTo) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ id: tasks.length + 1, title: taskTitle, description: taskDescription, assignedTo: assignedTo, status: 'pending' });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Ensure the tasks are properly saved when the manager creates them
document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskTitle = document.getElementById('task-title').value.trim();
    const taskDescription = document.getElementById('task-description').value.trim();
    const assignedTo = document.getElementById('assigned-to').value.trim();
    if (taskTitle && taskDescription && assignedTo) {
        createTask(taskTitle, taskDescription, assignedTo);
        document.getElementById('task-title').value = '';
        document.getElementById('task-description').value = '';
        document.getElementById('assigned-to').value = '';
    } else {
        alert('Please fill in all task details.');
    }
});

// Render tasks function for manager's view
function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksSection = document.getElementById('task-list');
    tasksSection.innerHTML = '';
    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Assigned to: ${task.assignedTo}</p>
            <p>Status: ${task.status}</p>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        tasksSection.appendChild(taskDiv);
    });
}

// Load tasks on manager's view when the page loads
document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
});
