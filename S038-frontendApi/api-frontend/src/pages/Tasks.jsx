import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../api/client";
import TaskCard from "../components/TaskCard";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";


const ListTasks = () => {

    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const { user } = useContext(AuthContext);

    const [titleInput, setTitleInput] = useState('Title1');
    const [descriptionInput, setDescriptionInput] = useState('Description1');
    const [statusInput, setStatusInput] = useState('ToDo');
    const [priorityInput, setPriorityInput] = useState('Low');
    
    // Estados para el modo edición
    const [isEditing, setIsEditing] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await apiClient.get(`/projects/${projectId}/tasks`);
                setTasks(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [projectId]);

    // Edit: cargar datos y activar modo edición
    const handleEditTask = (task) => {
        setTitleInput(task.title);
        setDescriptionInput(task.description);
        setStatusInput(task.status);
        setPriorityInput(task.priority);

        setIsEditing(true);
        setEditingTaskId(task.id);
    }

    const handleDeleteTask = async (taskId) => {
        try {
            await apiClient.delete(`/tasks/${taskId}`);
            // Actualizar la lista sin recargar
            const updatedTasks = tasks.filter(t => t.id !== taskId);
            setTasks(updatedTasks);
            alert('Task deleted successfully!');
        } catch (error) {
            alert(`Failed to delete task. Status: ${error.response?.status} - ${JSON.stringify(error.response?.data)}`);
        }
    }

    // Crear o editar tarea
    const createTask = async () => {
        try {
            const taskData = {
                title: titleInput,
                description: descriptionInput,
                status: statusInput,
                priority: priorityInput
            };

            if (isEditing) {
                // Modo EDICIÓN: enviar PUT para actualizar
                await apiClient.put(`/tasks/${editingTaskId}`, taskData);
                
                // Actualizar la lista sin recargar
                const updatedTasks = tasks.map(t => 
                    t.id === editingTaskId 
                        ? { ...t, ...taskData }
                        : t
                );
                setTasks(updatedTasks);
                alert('Task updated successfully!');
            } else {
                // Modo CREAR: enviar POST
                await apiClient.post(`/projects/${projectId}/tasks`, taskData);
                alert('Task created successfully!');
                window.location.reload();
            }

            // Limpiar formulario
            setTitleInput('');
            setDescriptionInput('');
            setStatusInput('ToDo');
            setPriorityInput('Low');
            setIsEditing(false);
            setEditingTaskId(null);

        } catch (error) {
            alert(`Failed. Status: ${error.response?.status} - ${JSON.stringify(error.response?.data)}`);
        }
    }

    // Cancelar edición
    const cancelEdit = () => {
        setTitleInput('');
        setDescriptionInput('');
        setStatusInput('ToDo');
        setPriorityInput('Low');
        setIsEditing(false);
        setEditingTaskId(null);
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Task Management</h1>
            
            {/* FORMULARIO SIMPLE */}
            <div className="card card-custom p-4 mb-5">
                <h5 className="mb-4">{isEditing ? 'Edit Task' : 'Create Task'}</h5>
                
                <div className="row align-items-end">
                    <div className="col-md-2">
                        <label htmlFor="title" className="form-label fw-bold">Title</label>
                        <input 
                            type="text" 
                            id="title" 
                            className="form-control"
                            value={titleInput} 
                            onChange={(e) => setTitleInput(e.target.value)} 
                        />
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="description" className="form-label fw-bold">Description</label>
                        <input 
                            type="text" 
                            id="description" 
                            className="form-control"
                            value={descriptionInput} 
                            onChange={(e) => setDescriptionInput(e.target.value)} 
                        />
                    </div>

                    <div className="col-md-2">
                        <label htmlFor="status" className="form-label fw-bold">Status</label>
                        <select 
                            id="status" 
                            className="form-select"
                            value={statusInput} 
                            onChange={(e) => setStatusInput(e.target.value)}
                        >
                            <option value="ToDo">ToDo</option>
                            <option value="InProgress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>

                    <div className="col-md-2">
                        <label htmlFor="priority" className="form-label fw-bold">Priority</label>
                        <select 
                            id="priority" 
                            className="form-select"
                            value={priorityInput} 
                            onChange={(e) => setPriorityInput(e.target.value)}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="col-md-3 d-flex gap-2">
                        <button 
                            className="btn btn-primary flex-grow-1" 
                            onClick={() => createTask()}
                        >
                            {isEditing ? 'Update' : 'Create'}
                        </button>

                        {isEditing && (
                            <button 
                                className="btn btn-secondary" 
                                onClick={() => cancelEdit()}
                            >
                                ✕ Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* LISTADO DE TAREAS */}
            {loading && <p>Loading...</p>}
            {error && <p className="alert alert-danger">Error: {error.message}</p>}
            
            <div className="row mx-3">
                {tasks.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-info text-center">
                            No tasks yet. Create one to get started
                        </div>
                    </div>
                ) 
                :                 
                (
                    tasks.map(task => (
                        <div className="col-md-4 mb-3" key={task.id}>
                            <TaskCard 
                                task={task} 
                                onEdit={() => handleEditTask(task)} 
                                onDelete={() => handleDeleteTask(task.id)} 
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ListTasks;