// Obtener referencias a los elementos del DOM
const newTask = document.getElementById("nueva-tarea");
const button = document.getElementById("agregar-tarea");
const taskList = document.getElementById("lista-tareas");

const totalTasks = document.getElementById("total-tareas");
const completedTasks = document.getElementById("tareas-completadas");
const pendingTasks = document.getElementById("tareas-pendientes");

//Eventos
newTask.addEventListener("input", () => {
    console.log(`Texto ingresado: ${newTask.value}`);
});

button.addEventListener("click", () =>{
    
    if(newTask.value.trim() === ""){
        alert("Por favor, ingresa una tarea válida.");
        return;
    }
    
    const li = document.createElement("li");
    li.textContent = `${newTask.value}`;
    taskList.appendChild(li);
    newTask.value = "";

    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.classList.add("eliminar-btn");
    li.appendChild(btn);
    actualizarContadores();
});

taskList.addEventListener("click", (event) => {
    if(event.target.tagName === "LI"){
        event.target.classList.toggle("completado");
        actualizarContadores();
    }
    if(event.target.tagName === "BUTTON" && event.target.classList.contains("eliminar-btn")){
        const li = event.target.parentElement;
        taskList.removeChild(li);
        actualizarContadores();
    }
});

function actualizarContadores(){
    const total = taskList.querySelectorAll("li").length;
    const completadas = document.querySelectorAll("#lista-tareas li.completado").length;
    const pendientes = total - completadas;
    totalTasks.textContent = `${total}`;
    completedTasks.textContent = `${completadas}`;
    pendingTasks.textContent = `${pendientes}`;
}
