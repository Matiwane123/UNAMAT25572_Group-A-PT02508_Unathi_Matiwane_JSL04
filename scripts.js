// =======================
// Task Data
// =======================
const tasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Kickstart your journey",
    status: "todo",
  },
  {
    id: 2,
    title: "Conquer React ⚛️",
    description: "Learn React fundamentals",
    status: "todo",
  },
  {
    id: 3,
    title: "Understand Databases ⚙️",
    description: "Study SQL & NoSQL",
    status: "todo",
  },
  {
    id: 4,
    title: "Crush Frameworks 🖼️",
    description: "Explore Angular/Vue",
    status: "todo",
  },
  {
    id: 5,
    title: "Master JavaScript 💛",
    description: "Deep dive into JS",
    status: "doing",
  },
  {
    id: 6,
    title: "Never Give Up 🏆",
    description: "Stay motivated",
    status: "doing",
  },
  {
    id: 7,
    title: "Explore ES6 Features 🚀",
    description: "Use modern JS syntax",
    status: "done",
  },
  { id: 8, title: "Have fun 🥳", description: "Enjoy coding", status: "done" },
];

// =======================
// DOM Elements
// =======================
const columns = {
  todo: document.querySelector('[data-status="todo"] .tasks-container'),
  doing: document.querySelector('[data-status="doing"] .tasks-container'),
  done: document.querySelector('[data-status="done"] .tasks-container'),
};

const modal = document.createElement("div");
modal.classList.add("modal");
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-btn">&times;</span>
    <label>Title:
      <input id="modal-title" type="text" />
    </label>
    <label>Description:
      <textarea id="modal-description"></textarea>
    </label>
    <label>Status:
      <select id="modal-status">
        <option value="todo">TODO</option>
        <option value="doing">DOING</option>
        <option value="done">DONE</option>
      </select>
    </label>
    <button id="save-task">Save Changes</button>
  </div>
`;
document.body.appendChild(modal);

let currentTask = null;

// =======================
// Render Tasks
// =======================
function renderTasks(taskList) {
  Object.values(columns).forEach((col) => (col.innerHTML = ""));

  taskList.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-div");
    taskDiv.textContent = task.title;
    taskDiv.dataset.id = task.id;

    taskDiv.addEventListener("click", () => openModal(task));
    columns[task.status].appendChild(taskDiv);
  });

  updateCounts();
}

// =======================
// Update Column Counts
// =======================
function updateCounts() {
  document.querySelectorAll(".column-div").forEach((column) => {
    const status = column.dataset.status.toUpperCase();
    const count = column.querySelectorAll(".task-div").length;
    column.querySelector(".columnHeader").textContent = `${status} (${count})`;
  });
}

// =======================
// Modal Logic
// =======================
function openModal(task) {
  currentTask = task;
  modal.style.display = "flex";
  document.getElementById("modal-title").value = task.title;
  document.getElementById("modal-description").value = task.description;
  document.getElementById("modal-status").value = task.status;
}

function closeModal() {
  modal.style.display = "none";
  currentTask = null;
}

modal.querySelector(".close-btn").addEventListener("click", closeModal);

document.getElementById("save-task").addEventListener("click", () => {
  if (!currentTask) return;

  currentTask.title = document.getElementById("modal-title").value;
  currentTask.description = document.getElementById("modal-description").value;
  currentTask.status = document.getElementById("modal-status").value;

  renderTasks(tasks);
  closeModal();
});

// =======================
// Init
// =======================
renderTasks(tasks);
