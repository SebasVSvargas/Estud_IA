let tasks = [
    { 
        id: 1, 
        title: "Create API", 
        projectId: 1, 
        status: "ToDo" 
    },
    { 
        id: 2, 
        title: "Design Database", 
        projectId: 1, 
        status: "InProgress" 
    },
    { 
        id: 3, 
        title: "Implement Authentication", 
        projectId: 2, 
        status: "Done" 
    }
];

const getTasksByProjectId = (req, res) => {

    const projectId = parseInt(req.params.projectId)

    //Validar que el proyecto exista (opcional, pero recomendado)
    if (!projects.find(p => p.id === projectId)) {
        return res.status(404).json({ error: "Project not found" })
    }

    const projectTasks = tasks.filter(
        t => t.projectId === projectId
    )
    res.json(projectTasks)
}



//POST /api/projects/:projectId/tasks
const createTask = (req, res) => {
    const projectId = parseInt(req.params.projectId)
    const { title, status } = req.body

    if (!title || !status) {
        return res.status(400).json({ error: "Title and status are required" })
    }
    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        title,
        projectId,
        status
    }
    tasks.push(newTask)
    res.status(201).json({ message: "Task created", task: newTask })
}


const getTaskById = (req, res) => {
    
    //recuperar los parametros del endpoint
    const taskId = parseInt(req.params.id)

    //buscar la tarea a nivel de la entidad que estemos manejando
    const task = tasks.find(t => t.id === taskId)
    if (!task) {
        return res.status(404).json({ error: "Task not found" })
    }

    //respuesta del servidor
    res.json(task)
}


//PUT /api/tasks/:id
const updateTask = (req, res) => {

    const taskId = parseInt(req.params.id)    
    const task = tasks.find(t => t.id === taskId)
    if (!task) {
        return res.status(404).json({ error: "Task not found" })
    }

    const { title, status } = req.body

    //validar que el body tenga los campos necesarios
    if (!title && !status) {
        return res.status(400).json({ error: "At least one of title or status is required" })
    }
    
    task.title = title
    task.status = status

    res.json({ message: "Task updated", task })
}

//DELETE /api/tasks/:id
const deleteTask = (req, res) => {
    const taskId = parseInt(req.params.id)
    const taskIndex = tasks.findIndex(t => t.id === taskId)
    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" })
    }
    const taskDeleted = tasks.splice(taskIndex, 1)
    res.json({ message: "Task deleted", task: taskDeleted[0] })
}


module.exports = {
    getTasksByProjectId,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
}