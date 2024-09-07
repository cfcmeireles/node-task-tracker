const fs = require("fs");
let tasks;
let taskDescription;
let taskId;
const args = process.argv.slice(2);
const userInput = args[0];
const currentDate = new Date().toLocaleString("en-US", {
  timeZoneName: "short",
});

// Read file
fs.readFile("tasks.json", "utf8", (err, data) => {
  if (err) {
    console.log("Error reading file:", err);
    return;
  }
  try {
    tasks = JSON.parse(data);
    taskId = tasks[tasks.length - 1];
    taskDescription = tasks.map((task) => task.description);
  } catch (err) {
    console.log("Error parsing JSON:", err);
  }

  // Create new task object
  const newTask = {
    id: taskId.id + 1,
    description: userInput,
    status: "todo",
    createdAt: currentDate,
    updatedAt: "",
  };

  console.log(taskDescription);
  tasks.push(newTask);
  const tasksClone = tasks.slice();

  // Write tasks to file
  fs.writeFile("tasks.json", JSON.stringify(tasksClone), (err) => {
    if (err) {
      console.log("Error writing to file:", err);
      return;
    }
  });
});
