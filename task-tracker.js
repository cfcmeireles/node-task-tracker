const fs = require("fs");
let tasks;
let taskId;
let taskStatus;
let tasksClone;

const currentDate = new Date().toLocaleString("en-US", {
  timeZoneName: "short",
});

// Command handlers
const listTasks = (status) => {
  setImmediate(() => {
    readTasksFile(() => {
      if (status) {
        taskStatus = tasks.map((task) => task.status);
        for (var i = 0; i < taskStatus.length; i++) {
          // Log tasks with selected status to the console
          if (taskStatus[i] === status) {
            console.log(tasks[i].description);
          }
        }
      } else {
        // Log all tasks
        tasks.forEach((task) => console.log(task.description));
      }
    });
  });
};

const addTask = (description) => {
  setImmediate(() => {
    readTasksFile(() => {
      taskId = tasks[tasks.length - 1];
      // Create new task object
      const newTask = {
        id: taskId.id + 1,
        description: description,
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
};

const updateTask = (id, updatedTask) => {
  setImmediate(() => {
    readTasksFile(() => {
      taskId = tasks.map((task) => task.id);
      for (var i = 0; i < taskId.length; i++) {
        // Update selected task's description
        if (taskId[i] === parseInt(id)) {
          tasks[i].description = updatedTask;
          tasks[i].updatedAt = currentDate;
        }
      }
      writeTasksFile(tasks);
    });
  });
};

const deleteTask = (id) => {
  setImmediate(() => {
    readTasksFile(() => {
      taskId = tasks.map((task) => task.id);
      for (var i = 0; i < taskId.length; i++) {
        // Delete selected task
        if (taskId[i] === parseInt(id)) {
          tasks = tasks.filter((task) => task.id !== parseInt(id));
        }
      }
      writeTasksFile(tasks);
    });
  });
};

const updateTaskStatus = (id, command) => {
  setImmediate(() => {
    readTasksFile(() => {
      taskId = tasks.map((task) => task.id);
      for (var i = 0; i < taskId.length; i++) {
        // Change selected task's status
        if (taskId[i] === parseInt(id)) {
          tasks[i].status = command;
          tasks[i].updatedAt = currentDate;
        }
      }
      writeTasksFile(tasks);
    });
  });
};

// Read file
const readTasksFile = (callback) => {
  fs.readFile("tasks.json", "utf8", (err, data) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }
    try {
      tasks = JSON.parse(data);
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

module.exports = {
  listTasks,
  addTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
