import {useState} from "react" //es el hook de react más usado
import TaskItem from "./TaskItem";
import useTask from "../hooks/useTask";
import CardItem from "./CardItem";

function TaskList({ name }) {

    //const [estado, establecerEstado] = useState(estadoInicial)
    const { tasks, count, addTask, deleteTask, toggleTask, updateCount, setFilter, loading} = useTask()
    const [newTask, setNewTask] = useState("")//estado para el input

    const addTaskDummy = () => {
        const newTask = {
            id: Date.now(),
            text: "Nueva Tarea",
            completed: false
        }
        // setTasks([...tasks, newTask])//esta funcion le dice al estado que se actualizó
        addTask(newTask)
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
        // setTasks([...tasks, newTaskObj])//agrega la nueva tarea al estado
        addTask(newTaskObj)
        setNewTask("")//limpia el input después de agregar la tarea
    }

    //devuelve archivo jsx.
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

            {/* filteredTask  */}
            {/* {tasks.map((t)=> (
                <TaskItem 
                    key={t.id} 
                    task={t} 
                    onDelete={deleteTask}
                    onToggle={toggleTask}
                />                
            ))} */}

            {loading ? (
                <p>Cargando tareas...</p>
            ) : (
                tasks.map((t)=> (
                    <CardItem 
                        key={t.id} 
                        task={t} 
                        onDelete={deleteTask}
                        onToggle={toggleTask}
                    />                
                ))
            )}

        </ul>
        </>
    );
}

export default TaskList;