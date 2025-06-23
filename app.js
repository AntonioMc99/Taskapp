let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  const filterStatus = document.getElementById("filterStatus").value;
  const filterCategory = document.getElementById("filterCategory").value.toLowerCase();

  taskList.innerHTML = "";

  const now = new Date().toISOString().split("T")[0];

  tasks.forEach((task, index) => {
    if (new Date(task.deadline) < new Date(now) && task.status !== "Completed") {
      task.status = "Overdue";
    }

    if ((filterStatus && task.status !== filterStatus) ||
        (filterCategory && !task.category.toLowerCase().includes(filterCategory))) {
      return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${task.name}</strong><br/>
      Category: ${task.category} <br/>
      Deadline: ${task.deadline} <br/>
      Status:
      <select onchange="updateStatus(${index}, this.value)">
        <option ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
        <option ${task.status === "Completed" ? "selected" : ""}>Completed</option>
        <option ${task.status === "Overdue" ? "selected" : ""}>Overdue</option>
      </select>
    `;
    taskList.appendChild(li);
  });

  saveTasks();
}

function addTask() {
  const name = document.getElementById("taskName").value.trim();
  const category = document.getElementById("taskCategory").value.trim();
  const deadline = document.getElementById("taskDeadline").value;
  const status = document.getElementById("taskStatus").value;

  if (!name || !category || !deadline) return alert("Fill all fields!");

  tasks.push({ name, category, deadline, status });
  document.querySelector(".form").reset();
  renderTasks();
}

function updateStatus(index, newStatus) {
  tasks[index].status = newStatus;
  renderTasks();
}

document.getElementById("addTaskBtn").addEventListener("click", addTask);
document.getElementById("filterStatus").addEventListener("change", renderTasks);
document.getElementById("filterCategory").addEventListener("input", renderTasks);

renderTasks();

