const cron = require('node-cron');
const sendEmailNotification = require('./emailService');

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const users = JSON.parse(localStorage.getItem('users')) || [];

tasks.forEach(task => {
    if (task.isRecurring) {
        cron.schedule(getCronSchedule(task.recurrenceInterval), () => {
            const assignee = users.find(user => user.id === task.assignedTo);
            const manager = users.find(user => user.role === 'manager');
            sendEmailNotification(assignee.email, 'Task Reminder', `Reminder: ${task.title} is due on ${task.dueDate}`);
            sendEmailNotification(manager.email, 'Task Reminder', `Reminder: ${task.title} assigned to ${assignee.username} is due on ${task.dueDate}`);
        });
    }
});

function getCronSchedule(interval) {
    switch (interval) {
        case 'daily':
            return '0 0 * * *';
        case 'weekly':
            return '0 0 * * 0';
        default:
            return '0 0 * * *';
    }
}
