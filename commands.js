#!/usr/bin/env node

const {
  listTasks,
  addTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("./task-tracker.js");

const args = process.argv.slice(2);
let command = args[0];
let userInput = args[1];
let updatedTask = args[2];

switch (command) {
  case "list":
    listTasks(userInput);
    break;
  case "add":
    if (userInput) {
      addTask(userInput);
    } else {
      console.log("Please provide the task's description");
    }
    break;
  case "update":
    if (updatedTask && userInput) {
      updateTask(userInput, updatedTask);
    } else {
      console.log("Please provide the task id and the new description");
    }
    break;
  case "delete":
    if (userInput) {
      deleteTask(userInput);
    } else {
      console.log("Please provide the task id");
    }
    break;
  case "mark-in-progress":
    if (userInput) {
      command = command.slice(5);
      updateTaskStatus(userInput, command);
    } else {
      console.log("Please provide the task id");
    }
    break;
  case "mark-done":
    if (userInput) {
      command = command.slice(5);
      updateTaskStatus(userInput, command);
    } else {
      console.log("Please provide the task id");
    }
    break;
  default:
    console.log(
      "Unknown command, commands available: list, add, update, delete, mark-in-progress, mark-done"
    );
}
