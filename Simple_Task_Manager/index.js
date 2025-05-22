"use strict";
class Task {
    constructor(taskId, taskTitle, taskCompleted) {
        this.taskId = taskId;
        this.taskTitle = taskTitle;
        this.taskCompleted = taskCompleted;
    }
    updateTask(taskTitle = this.taskTitle, taskCompleted = this.taskCompleted) {
        this.taskTitle = taskTitle;
        this.taskCompleted = taskCompleted;
        return `Task with id: #${this.taskId} was sucessfully updated.`;
    }
    completeTask(taskId) {
        if (this.taskId === taskId) {
            this.taskCompleted = true;
            return `Task with id: #${this.taskId} was sucessfully completed.`;
        }
    }
}
class TaskManager {
    constructor() {
        this.tasks = [];
    }
    createTask(taskId, taskTitle, taskCompleted = false) {
        const checkIfTaskExists = this.tasks.some(task => task.taskId === taskId);
        if (checkIfTaskExists) {
            return `Sorry, a task with id: #${taskId} has been created already.`;
        }
        const newTask = new Task(taskId, taskTitle, taskCompleted);
        this.tasks.push(newTask);
        return `Task with id: #${taskId} was successfully created.`;
    }
    updateTask(taskId, taskTitle, taskCompleted) {
        const task = this.tasks.find(task => task.taskId === taskId);
        if (!task) {
            return `Task with id: #${taskId} does not exist.`;
        }
        const taskMsg = task.updateTask(taskTitle, taskCompleted);
        return taskMsg;
    }
    completedTask(taskId) {
        const task = this.tasks.find(task => task.taskId === taskId);
        if (!task) {
            return `Task with id: #${taskId} does not exist.`;
        }
        task.completeTask(taskId);
        return `Task with id: #${taskId} has been marked as completed.`;
    }
    listTasks() {
        let taskList = "";
        console.log("These are the list of tasks.");
        for (const task of this.tasks) {
            taskList += `Task-title: ${task.taskTitle}, TaskCompletion: ${task.taskCompleted} \n`;
        }
        return taskList;
    }
}
const taskManager = new TaskManager();
console.log(taskManager.createTask("1", "Eat at Enijoku", false));
console.log(taskManager.createTask("2", "Leave Enijoku with Bedsheet", false));
console.log(taskManager.createTask("3", "Sleep at Mariere", false));
console.log(taskManager.createTask("4", "Complete Scan functionality", false));
console.log(taskManager.createTask("3", "Write Report", false));
console.log(taskManager.listTasks());
console.log(taskManager.updateTask("4", "Complete Scan functionality on wedding website"));
console.log(taskManager.updateTask("1", "Eat at Enijoku", true));
console.log(taskManager.listTasks());
console.log(taskManager.completedTask("4"));
console.log(taskManager.listTasks());
