import { useState } from "react";

function TaskItem({ task, onToggle, onDelete }) {

    const [isChecked, setIsChecked] = useState(task.completed)

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
        onToggle(task.id)
    }

    const handleDelete = () =>{
        onDelete(task.id)
    }

    return (
        <li className="task-item-container">
            <input className="checkbox-item"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <span 
                className={`task-item ${isChecked ? "completed" : ""}`}>{task.text}
            </span>
            <button onClick={handleDelete}>🗑️</button>
        </li>
    );
}

export default TaskItem;