const taskInput = document.getElementById("nueva-tarea");
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("lista-tareas");
const emptyState = document.getElementById("estado-vacio");
const filterBtns = document.querySelectorAll(".filter-btn");
const itemsCount = document.getElementById("items-count");

const totalTasks = document.getElementById("total-tareas");
const pendingTasks = document.getElementById("tareas-pendientes");
const completedTasks = document.getElementById("tareas-completadas");

let tasks = JSON.parse(localStorage.getItem("taskflow-pro")) || [];
let currentFilter = "all";

// Funciones de utilidad
const saveToLocalStorage = () => {
  localStorage.setItem("taskflow-pro", JSON.stringify(tasks));
};

const updateUI = () => {
  renderTasks();
  updateStats();
};

const updateStats = () => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  totalTasks.textContent = total;
  pendingTasks.textContent = pending;
  completedTasks.textContent = completed;
  itemsCount.textContent = `${tasks.length} item${tasks.length !== 1 ? 's' : ''}`;
};

const renderTasks = () => {
  taskList.innerHTML = "";
  
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "pending") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;
    
    // Usamos el ID real de la tarea en lugar del índice del array filtrado
    const taskIndex = tasks.findIndex(t => t.id === task.id);

    li.innerHTML = `
      <div class="custom-checkbox" data-index="${taskIndex}"></div>
      <span class="task-text" data-index="${taskIndex}">${task.text}</span>
      <button class="btn-delete" data-index="${taskIndex}" title="Eliminar tarea">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
      </button>
    `;
    
    taskList.appendChild(li);
  });
};

// Event Listeners
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  
  if (text) {
    tasks.unshift({
      id: Date.now(),
      text,
      completed: false
    });
    taskInput.value = "";
    saveToLocalStorage();
    updateUI();
  }
});

taskList.addEventListener("click", (e) => {
  const target = e.target.closest("[data-index]");
  if (!target) return;

  const index = parseInt(target.getAttribute("data-index"));

  if (e.target.closest(".custom-checkbox") || e.target.closest(".task-text")) {
    tasks[index].completed = !tasks[index].completed;
  } else if (e.target.closest(".btn-delete")) {
    tasks.splice(index, 1);
  }

  saveToLocalStorage();
  updateUI();
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.getAttribute("data-filter");
    renderTasks();
  });
});

// Inicialización
updateUI();
