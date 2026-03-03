import {useState} from "react" //es el hook de react más usado
import TaskItem from "./TaskItem";

function TaskList({ name }) {

    //const [estado, establecerEstado] = useState(estadoInicial)
    const [tasks, setTasks] = useState([
        {id:1, text: "Estudiar React"},
        {id:2, text: "Estudiar TypeScript"},
        {id:3, text: "Estudiar Python"},
        {id:4, text: "Estudiar FastApi"}
    ])

    const addTask = () => {
        const newTask = {
            id: Date.now(),
            text: "Nueva Tarea"
        }
        setTasks([...tasks, newTask])//esta funcion le dice al estado que se actualizó
    }

    const [count, setCount] = useState(0)
    const updateCount = () => {
        setCount(count+1)
    }

    return (
        <>
        <h2>Lista:{name}</h2>
        <ul className="task-list">

            <button onClick={addTask}>Agregar Tarea Dummy</button>
            <button onClick={updateCount}>Contador: {count}</button>
            
            {tasks.map((t)=> (
                <TaskItem key={t.id} text={t.text}/>                
            ))}

        </ul>
        </>
    );
}

export default TaskList;