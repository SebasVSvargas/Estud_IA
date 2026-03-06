        //  propiedades de cada objeto obtenido de la API.
        // "id": 1,
        // "title": "Build React Components",
        // "description": "Create reusable UI components using JSX and props",
        // "status": "in-progress",
        // "priority": "high",
        // "emoji": "⚛️"

import { useState } from "react";

function CardItem({ task, onToggle, onDelete }) {
    const { id, title, description, status, priority, emoji , completed } = task; //desestructuración del objeto task para obtener sus propiedades
    const [isChecked, setIsChecked] = useState(completed) //estado para el checkbox, se inicializa en true si el status es "completed"

    const handleToggle = () => {
        setIsChecked(!isChecked);
        onToggle(task.id);  // Pasa el id de la tarea al componente padre para que pueda actualizar su estado
    }

    const handleDelete = (e) => {
        e.stopPropagation();  // Evita que dispare onToggle
        onDelete(task.id);
    }

    return (
        <div 
            className={`card-item ${isChecked ? "checked" : ""}`}
            onClick={handleToggle}
        >
            <h3>{emoji} {title}</h3>
            <p>{description}</p>
            <p>Status: {status}</p>
            <p className={`priority-${priority}`}>Priority: {priority}</p>
            <button onClick={handleDelete}>🗑️</button>
        </div>
        );
}

export default CardItem;