const fs = require("fs");
let tasks;
let taskDescription;
let taskId;
let tasksClone;
const args = process.argv.slice(2);
const command = args[0];
const userInput = args[1];
const updateTask = args[2];
const currentDate = new Date().toLocaleString("en-US", {
  timeZoneName: "short",
});

// Commands
if (command === "list") {
  setImmediate(() => {
    readTasksFile(() => {
      console.log(taskDescription);
    });
  });
}

if (command === "add") {
  setImmediate(() => {
    readTasksFile(() => {
      taskId = tasks[tasks.length - 1];
      // Create new task object
      const newTask = {
        id: taskId.id + 1,
        description: userInput,
        status: "todo",
        createdAt: currentDate,
        updatedAt: "",
      };
      tasks.push(newTask);
      tasksClone = tasks.slice();
      writeTasksFile(tasksClone);
      console.log(`Task added successfully (ID: ${taskId.id + 1})`);
    });
  });
}

if (command === "update" && updateTask) {
  setImmediate(() => {
    readTasksFile(() => {
      taskId = tasks.map((task) => task.id);
      for (var i = 0; i < taskId.length; i++) {
        // Update selected task's description
        if (taskId[i] === parseInt(userInput)) {
          tasks[i].description = updateTask;
          tasks[i].updatedAt = currentDate;
        }
      }
      writeTasksFile(tasks);
    });
  });
}

if (command === "delete") {
  setImmediate(() => {
    readTasksFile(() => {
      taskId = tasks.map((task) => task.id);
      for (var i = 0; i < taskId.length; i++) {
        // Delete selected task
        if (taskId[i] === parseInt(userInput)) {
          tasks = tasks.filter((task) => task.id !== parseInt(userInput));
        }
      }
      writeTasksFile(tasks);
    });
  });
}

// Read file
const readTasksFile = (callback) => {
  fs.readFile("tasks.json", "utf8", (err, data) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }
    try {
      tasks = JSON.parse(data);
      taskDescription = tasks.map((task) => task.description);
    } catch (err) {
      console.log("Error parsing JSON:", err);
    }
    callback();
  });
};

// Write tasks to file
const writeTasksFile = (tasksClone) => {
  fs.writeFile("tasks.json", JSON.stringify(tasksClone), (err) => {
    if (err) {
      console.log("Error writing to file:", err);
      return;
    }
  });
};
