import { useState, useEffect, use } from "react";

function useTask() {

    const defaultTasks = [
        {id:1, text: "Estudiar React", completed: false},
        {id:2, text: "Estudiar TypeScript", completed: false},
        {id:3, text: "Estudiar Python", completed: false},
        {id:4, text: "Estudiar FastApi", completed: false}
    ]
    
    const [tasks, setTasks] = useState(defaultTasks)
    const [count, setCount] = useState(0)
    const [filter, setFilter] = useState("all")//estado para el filtro de tareas
    const [loading, setLoading] = useState(true)

    const API_URL = "https://tasklistapi.vercel.app/tasks"

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(API_URL, {
                    headers: {
                        Authorization : "Bearer react-students-token"
                    }
                })

                // Estructura de cada objeto obtenido de la API.
                //  "id": 1,
                // "title": "Build React Components",
                // "description": "Create reusable UI components using JSX and props",
                // "status": "in-progress",
                // "priority": "high",
                // "emoji": "⚛️"

                const data = await response.json()
                const formattedData = data.map((task) => ({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    priority: task.priority,
                    emoji: task.emoji,
                    completed: false
                }))
                
                setTasks(formattedData)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching tasks:", error)
            }
    }

        fetchTasks()
    }, [])



    const addTask = (task) => {
        setTasks([...tasks, task])
    }
    
    const deleteTask = (taskId) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const toggleTask = (taskId) => {
        setTasks(tasks.map(t => 
            taskId === t.id ? {...t, completed: !t.completed} : t
        ))
    }

    const updateCount = () => {
    setCount(count+1)
    }

    //filtro
    const filteredTasks = tasks.filter((t) => {
        if (filter === "all") return true
        if (filter === "completed") return t.completed
        if (filter === "pending") return !t.completed
        return true
    })

    return {
        tasks : filteredTasks,
        count,
        addTask,
        deleteTask,
        toggleTask,
        updateCount,
        setFilter,
        loading
    }
}

export default useTask