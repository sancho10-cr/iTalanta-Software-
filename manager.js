'use strict';

// Function to retrieve and display departments from localStorage
function displayDepartments() {
    const departments = JSON.parse(localStorage.getItem('departments')) || [];
    const departmentList = document.getElementById("department-list");
    departmentList.innerHTML = ''; // Clear existing department list
    departments.forEach(department => {
        const departmentElement = document.createElement("div");
        departmentElement.textContent = department;
        departmentList.appendChild(departmentElement);
    });
}

// Function to retrieve and display tasks from localStorage
function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const employeeList = document.getElementById("employee-list");
    employeeList.innerHTML = ''; // Clear existing employee list
    tasks.forEach(task => {
        const taskElement = document.createElement("li");
        taskElement.textContent = `${task.employeeName}: ${task.taskName}`;
        employeeList.appendChild(taskElement);
    });
}

// Event listener for DOMContentLoaded event to display departments and tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayDepartments();
    displayTasks();
});

// Function to create a new department
function createDepartment() {
    const departmentName = prompt("Enter department name:");
    if (departmentName) {
        // Create department element
        const departmentElement = document.createElement("div");
        departmentElement.textContent = departmentName;
        document.getElementById("department-list").appendChild(departmentElement);
        
        // Store department in localStorage
        const departments = JSON.parse(localStorage.getItem('departments')) || [];
        departments.push(departmentName);
        localStorage.setItem('departments', JSON.stringify(departments));
    }
}

// Event listener for creating a department
document.getElementById("create-department-btn").addEventListener("click", createDepartment);

// Function to assign task to employees
function assignTask() {
    const taskName = prompt("Enter task name:");
    const employeeName = prompt("Enter employee name:");
    if (taskName && employeeName) {
        // Assign task to employee (implementation depends on your data structure)
        // For simplicity, let's assume we have a list of tasks and employees
        const taskElement = document.createElement("li");
        taskElement.textContent = taskName;
        const employeeList = document.getElementById("employee-list");
        employeeList.innerHTML += `<li>${employeeName}: ${taskName}</li>`;
        
        // Store task assignment in localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ taskName, employeeName });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Event listener for assigning a task
document.getElementById("assign-task-btn").addEventListener("click", assignTask);

// Function to manage employees
function manageEmployees() {
    const employeeName = prompt("Enter employee name:");
    if (employeeName) {
        // Implement employee management functionality (e.g., move to another department, remove employee)
        // For simplicity, let's assume we have a list of employees
        // Here, you can display a modal or prompt with options to manage the employee
        alert(`Employee "${employeeName}" management options`);
    }
}

// Add event listener for managing employees
document.getElementById("manage-employees-btn").addEventListener("click", manageEmployees);
