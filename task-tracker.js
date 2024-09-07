const fs = require("fs");

fs.readFile("tasks.json", "utf8", (err, data) => {
  if (err) {
    console.log("Error reading file:", err);
    return;
  }
  try {
    const tasks = JSON.parse(data);
    console.log(tasks);
  } catch (err) {
    console.log("Error parsing JSON:", err);
  }
});
