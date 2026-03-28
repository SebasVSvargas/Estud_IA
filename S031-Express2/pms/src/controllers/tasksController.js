
const getTasksByProjectId = async (req, res) => {
    const db = req.app.locals.db;
    const projectId = parseInt(req.params.projectId);

    const tasks = await db.all(
        "SELECT * FROM tasks WHERE project_id = ?",
        [projectId]
    );

    res.json(tasks);
};

// POST /api/projects/:projectId/tasks
const createTask = async (req, res) => {
    const db = req.app.locals.db;
    const projectId = parseInt(req.params.projectId);

    const {
        title,
        description,
        status = "pending",
        priority = "medium",
        user_id,
        due_date
    } = req.body;

    const result = await db.run(
        `INSERT INTO tasks 
        (title, description, status, priority, project_id, user_id, due_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, description, status, priority, projectId, user_id, due_date]
    );

    const newTask = await db.get(
        "SELECT * FROM tasks WHERE id = ?",
        [result.lastID]
    );

    res.status(201).json(newTask);
};

const getTaskById = async (req, res) => {
    const db = req.app.locals.db;
    const id = parseInt(req.params.id);

    const task = await db.get(
        "SELECT * FROM tasks WHERE id = ?",
        [id]
    );

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
};

const updateTask = async (req, res) => {
    const db = req.app.locals.db;
    const id = parseInt(req.params.id);

    const existingTask = await db.get(
        "SELECT * FROM tasks WHERE id = ?",
        [id]
    );

    if (!existingTask) {
        return res.status(404).json({ message: "Task not found" });
    }

    const {
        title,
        description,
        status,
        priority,
        user_id,
        due_date
    } = req.body;

    await db.run(
        `UPDATE tasks SET
            title = ?,
            description = ?,
            status = ?,
            priority = ?,
            user_id = ?,
            due_date = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`,
        [
            title ?? existingTask.title,
            description ?? existingTask.description,
            status ?? existingTask.status,
            priority ?? existingTask.priority,
            user_id ?? existingTask.user_id,
            due_date ?? existingTask.due_date,
            id
        ]
    );

    const updatedTask = await db.get(
        "SELECT * FROM tasks WHERE id = ?",
        [id]
    );

    res.json(updatedTask);
};

const deleteTask = async (req, res) => {
    const db = req.app.locals.db;
    const id = parseInt(req.params.id);

    const task = await db.get(
        "SELECT * FROM tasks WHERE id = ?",
        [id]
    );

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    await db.run(
        "DELETE FROM tasks WHERE id = ?",
        [id]
    );

    res.json({
        message: "Task deleted",
        task
    });
};

const getCurrentUser = (req, res) => {
    res.json({ user: req.user });
};

// Endpoint para testear las funcionalidades de sort, filter y pagination
const listTasks = async (req, res) => {

    const db = req.app.locals.db;
    const { status, priority } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'created_at';
    const offset = (page - 1) * limit; // indica desde donde empieza a recuperar los registros, por ejemplo, si page=2 y limit=10, offset=10, entonces recupera desde el registro 11 en adelante.

    let query = "SELECT * FROM tasks WHERE 1=1"; //Se unas el 1=1 para facilitar la concatenacion de filtros, ya que siempre es verdadera y no afecta el resultado, pero permite agregar condiciones con AND sin preocuparse por si es la primera condicion o no.
    let params = [];

    //Filtramos columnas de la tabla tasks.
    // Agregar filtros dinámicamente según los parámetros de consulta
    if (status) {
        query += " AND status = ?";
        params.push(status);
    }

    if (priority) {
        query += " AND priority = ?";
        params.push(priority);
    }

    query += ` ORDER BY ${sort} ASC`; //Debe ir antes de la paginacion, porque primero se ordena y luego se aplica el limit y offset para recuperar solo los registros de esa pagina.

    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const tasks = await db.all(query, params);
    res.json(tasks);
}

module.exports = {
    getTasksByProjectId,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getCurrentUser,
    listTasks,
};



//Anterior version of the controller using an in-memory array instead of a database, for reference:
// let tasks = [
//     { 
//         id: 1, 
//         title: "Create API", 
//         projectId: 1, 
//         status: "ToDo" 
//     },
//     { 
//         id: 2, 
//         title: "Design Database", 
//         projectId: 1, 
//         status: "InProgress" 
//     },
//     { 
//         id: 3, 
//         title: "Implement Authentication", 
//         projectId: 2, 
//         status: "Done" 
//     }
// ];

// const tasksService = require('../services/tasks.service');

// const getTasksByProjectId = async (req, res) => {

//     // const projectId = parseInt(req.params.projectId)

//     // //Validar que el proyecto exista (opcional, pero recomendado)
//     // if (!projects.find(p => p.id === projectId)) {
//     //     return res.status(404).json({ error: "Project not found" })
//     // }

//     // const projectTasks = tasks.filter(
//     //     t => t.projectId === projectId
//     // )
//     // res.json(projectTasks)

//     const db = req.app.locals.db;
//     const projectId = parseInt(req.params.projectId);
//     const result = await tasksService.getTasksByProjectId(db, projectId);

//     if (!result.success) {
//         return res.status(404).json({ error: result.error });
//     }

//     res.json(result.data);
// }



// //POST /api/projects/:projectId/tasks
// const createTask = async (req, res) => {
//     // const projectId = parseInt(req.params.projectId)
//     // const { title, status } = req.body

//     // if (!title || !status) {
//     //     return res.status(400).json({ error: "Title and status are required" })
//     // }
//     // const newTask = {
//     //     id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
//     //     title,
//     //     projectId,
//     //     status
//     // }
//     // tasks.push(newTask)
//     // res.status(201).json({ message: "Task created", task: newTask })

//     const db = req.app.locals.db;
//     const projectId = parseInt(req.params.projectId);
//     const data = { ...req.body, projectId };
//     const result = await tasksService.createTask(db, data);

//     if (!result.success) {
//         return res.status(400).json({ error: result.error });
//     }

//     res.status(201).json({ message: "Task created", task: result.data });

// }


// const getTaskById = async (req, res) => {
    
//     // //recuperar los parametros del endpoint
//     // const taskId = parseInt(req.params.id)

//     // //buscar la tarea a nivel de la entidad que estemos manejando
//     // const task = tasks.find(t => t.id === taskId)
//     // if (!task) {
//     //     return res.status(404).json({ error: "Task not found" })
//     // }

//     // //respuesta del servidor
//     // res.json(task)

//     const db = req.app.locals.db;
//     const taskId = parseInt(req.params.id);
//     const result = await tasksService.getTaskById(db, taskId);

//     if (!result.success) {
//         return res.status(404).json({ error: result.error });
//     }

//     res.json(result.data);
// }


// //PUT /api/tasks/:id
// const updateTask = async (req, res) => {

//     // const taskId = parseInt(req.params.id)    
//     // const task = tasks.find(t => t.id === taskId)
//     // if (!task) {
//     //     return res.status(404).json({ error: "Task not found" })
//     // }

//     // const { title, status } = req.body

//     // //validar que el body tenga los campos necesarios
//     // if (!title && !status) {
//     //     return res.status(400).json({ error: "At least one of title or status is required" })
//     // }
    
//     // task.title = title
//     // task.status = status

//     // res.json({ message: "Task updated", task })

//     const db = req.app.locals.db;
//     const taskId = parseInt(req.params.id);
//     const { title, status } = req.body;
//     const result = await tasksService.updateTask(db, taskId, title, status);
//     if (!result.success) {
//         return res.status(400).json({ error: result.error });
//     }
//     res.json({ message: "Task updated", task: result.data });
// }

// //DELETE /api/tasks/:id
// const deleteTask = async (req, res) => {
//     // const taskId = parseInt(req.params.id)
//     // const taskIndex = tasks.findIndex(t => t.id === taskId)
//     // if (taskIndex === -1) {
//     //     return res.status(404).json({ error: "Task not found" })
//     // }
//     // const taskDeleted = tasks.splice(taskIndex, 1)
//     // res.json({ message: "Task deleted", task: taskDeleted[0] })

//     const db = req.app.locals.db;
//     const taskId = parseInt(req.params.id);
//     const result = await tasksService.deleteTask(db, taskId);
//     if (!result.success) {
//         return res.status(404).json({ error: result.error });
//     }
//     res.json({ message: "Task deleted", task: result.data });
// }

// const getCurrentUser = (req, res) => {
//     res.json({ user: req.user})
// }

// module.exports = {
//     getTasksByProjectId,
//     createTask,
//     getTaskById,
//     updateTask,
//     deleteTask,
//     getCurrentUser
// }
