import {useState} from "react" //es el hook de react más usado
import TaskItem from "./TaskItem";

function TaskList({ name }) {

    //valores por defecto para tasks
    const defaultTasks = [
        {id:1, text: "Estudiar React", completed: false},
        {id:2, text: "Estudiar TypeScript", completed: false},
        {id:3, text: "Estudiar Python", completed: false},
        {id:4, text: "Estudiar FastApi", completed: false}
    ]

    //const [estado, establecerEstado] = useState(estadoInicial)
    const [count, setCount] = useState(0)
    const [tasks, setTasks] = useState(defaultTasks)
    const [newTask, setNewTask] = useState("")//estado para el input
    const [filter, setFilter] = useState("all")//estado para el filtro de tareas

    const addTaskDummy = () => {
        const newTask = {
            id: Date.now(),
            text: "Nueva Tarea",
            completed: false
        }
        setTasks([...tasks, newTask])//esta funcion le dice al estado que se actualizó
    }

    const updateCount = () => {
        setCount(count+1)
    }

    const handleChange = (e) => {
        setNewTask(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()//evita que se recargue la página al enviar el formulario
        if (newTask.trim() === "") return //si el input está vacío, no hacer nada
        const newTaskObj = {
            id: Date.now(),
            text: newTask,
            completed: false
        }
        setTasks([...tasks, newTaskObj])//agrega la nueva tarea al estado
        setNewTask("")//limpia el input después de agregar la tarea
    }

    const handleDeleteTask = (id) => {
        const updatedTasks = tasks.filter((t) => t.id !== id)
        setTasks(updatedTasks)//actualizo el estado con la lista sin la tarea a eliminar
    }

    const handleToggleTask = (id) => {
        const updatedTasks = tasks.map((t) => {
            if (t.id === id) {
                return { ...t, completed: !t.completed }
            }
            return t
        })
        setTasks(updatedTasks)
    }

    const filteredTasks = tasks.filter((t) => {
        if (filter === "all") return true
        if (filter === "completed") return t.completed
        if (filter === "pending") return !t.completed
    })

    return (
        <>
        <h2>{name}</h2>
        <ul className="task-list">
            <button onClick={addTaskDummy}>Agregar Tarea Dummy</button>
            <button onClick={updateCount}>Contador: {count}</button>

            <form className="task-form" onSubmit={handleSubmit}>
                <input type="text" 
                value={newTask}
                onChange={handleChange} //Tambien se podría de forma resumida onChange={(e) => setNewTask(e.target.value)}
                placeholder="Escriba una tarea..."/>
                <button type="submit">Agregar Tarea</button>
            </form>

            <div className="filters">
                <button onClick={()=> setFilter("all")}>Todas</button>
                <button onClick={()=> setFilter("completed")}>Completadas</button>
                <button onClick={()=> setFilter("pending")}>Pendientes</button>
            </div>
            
            {filteredTasks.map((t)=> (
                <TaskItem 
                    key={t.id} 
                    task={t} 
                    completed={t.completed}
                    onDelete={handleDeleteTask}
                    onToggle={handleToggleTask}
                />                
            ))}

        </ul>
        </>
    );
}

export default TaskList;