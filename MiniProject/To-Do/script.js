// ==============================
// Select elements
// ==============================
const addbutton = document.querySelector(".add-button");
const input = document.querySelector(".todo-input");
const ul = document.querySelector(".task-list");
const activeCountEl = document.getElementById("active-count");
const completedPercentEl = document.getElementById("completed-percent");

// ==============================
// Load tasks on refresh
// ==============================
document.addEventListener("DOMContentLoaded", loadTasks);

// ==============================
// Add task function
// ==============================
function addTask(text = null, completed = false) {
  const texttask = text ?? input.value.trim();

  if (texttask === "") {
    alert("Please enter a task");
    return;
  }

  const li = document.createElement("li");
  li.className = "task";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = completed;

  const span = document.createElement("span");
  span.innerText = texttask;
  if (completed) span.classList.add("completed");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete-button";

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  ul.appendChild(li);

  input.value = "";

  saveTasks();
  updateStats();
}

// ==============================
// Button click
// ==============================
addbutton.addEventListener("click", () => addTask());

// ==============================
// Enter key support
// ==============================
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// ==============================
// Delete & checkbox handling
// ==============================
ul.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-button")) {
    e.target.parentElement.remove();
    saveTasks();
    updateStats();
  }
});

ul.addEventListener("change", function (e) {
  if (e.target.classList.contains("task-checkbox")) {
    const text = e.target.nextElementSibling;
    text.classList.toggle("completed", e.target.checked);
    saveTasks();
    updateStats();
  }
});

// ==============================
// Save to localStorage
// ==============================
function saveTasks() {
  const tasks = [];

  document.querySelectorAll(".task").forEach(task => {
    tasks.push({
      text: task.querySelector("span").innerText,
      completed: task.querySelector(".task-checkbox").checked
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ==============================
// Load from localStorage
// ==============================
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTask(task.text, task.completed));
  updateStats();
}

// ==============================
// Footer stats
// ==============================
function updateStats() {
  const tasks = document.querySelectorAll(".task");
  const total = tasks.length;

  let completed = 0;
  tasks.forEach(task => {
    if (task.querySelector(".task-checkbox").checked) {
      completed++;
    }
  });

  const active = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  activeCountEl.innerText = `${active} active task${active !== 1 ? "s" : ""}`;
  completedPercentEl.innerText = `${percent}% completed today`;
}
