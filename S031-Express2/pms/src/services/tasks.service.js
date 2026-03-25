// tasks.service.js - Capa de servicios: lógica de negocio que interactúa con la BD

/**
 * Obtiene todas las tareas de un proyecto específico
 * @param {Database} db - Instancia de la base de datos
 * @param {number} projectId - ID del proyecto
 * @returns {Object} { success: boolean, data: array, error: string }
 */
const getTasksByProjectId = async (db, projectId) => {
    try {
        // Validar que el proyecto exista
        const project = await db.get('SELECT id FROM projects WHERE id = ?', projectId);
        if (!project) {
            return {
                success: false,
                error: "Project not found"
            };
        }

        // Obtener todas las tareas del proyecto
        const projectTasks = await db.all(
            'SELECT * FROM tasks WHERE projectId = ? ORDER BY id ASC',
            projectId
        );
        
        return {
            success: true,
            data: projectTasks || []
        };
    } catch (err) {
        return {
            success: false,
            error: err.message
        };
    }
};

/**
 * Crea una nueva tarea para un proyecto
 * @param {Database} db - Instancia de la base de datos
 * @param {number} projectId - ID del proyecto
 * @param {string} title - Título de la tarea
 * @param {string} status - Estado de la tarea
 * @returns {Object} { success: boolean, data: object, error: string }
 */
const createTask = async (db, data) => {
    try {
        const { projectId, title, status } = data;

        // Validar parámetros
        if (!title || !status) {
            return {
                success: false,
                error: "Title and status are required"
            };
        }

        // Insertar la nueva tarea
        const result = await db.run(
            'INSERT INTO tasks (title, projectId, status) VALUES (?, ?, ?)',
            [title, projectId, status]
        );

        // Recuperar la tarea creada
        const newTask = await db.get('SELECT * FROM tasks WHERE id = ?', result.lastID);

        return {
            success: true,
            data: newTask
        };
    } catch (err) {
        return {
            success: false,
            error: err.message
        };
    }
};

/**
 * Obtiene una tarea por su ID
 * @param {Database} db - Instancia de la base de datos
 * @param {number} taskId - ID de la tarea
 * @returns {Object} { success: boolean, data: object, error: string }
 */
const getTaskById = async (db, taskId) => {
    try {
        const task = await db.get('SELECT * FROM tasks WHERE id = ?', taskId);
        
        if (!task) {
            return {
                success: false,
                error: "Task not found"
            };
        }

        return {
            success: true,
            data: task
        };
    } catch (err) {
        return {
            success: false,
            error: err.message
        };
    }
};

/**
 * Actualiza una tarea existente
 * @param {Database} db - Instancia de la base de datos
 * @param {number} taskId - ID de la tarea
 * @param {string} title - Nuevo título (opcional)
 * @param {string} status - Nuevo estado (opcional)
 * @returns {Object} { success: boolean, data: object, error: string }
 */
const updateTask = async (db, taskId, title, status) => {
    try {
        // Buscar la tarea
        const task = await db.get('SELECT * FROM tasks WHERE id = ?', taskId);
        
        if (!task) {
            return {
                success: false,
                error: "Task not found"
            };
        }

        // Validar que al menos uno de los campos esté presente
        if (!title && !status) {
            return {
                success: false,
                error: "At least one of title or status is required"
            };
        }

        // Actualizar solo los campos que se proporcionaron
        const updateTitle = title || task.title;
        const updateStatus = status || task.status;

        await db.run(
            'UPDATE tasks SET title = ?, status = ? WHERE id = ?',
            [updateTitle, updateStatus, taskId]
        );

        // Recuperar la tarea actualizada
        const updatedTask = await db.get('SELECT * FROM tasks WHERE id = ?', taskId);

        return {
            success: true,
            data: updatedTask
        };
    } catch (err) {
        return {
            success: false,
            error: err.message
        };
    }
};

/**
 * Elimina una tarea por su ID
 * @param {Database} db - Instancia de la base de datos
 * @param {number} taskId - ID de la tarea a eliminar
 * @returns {Object} { success: boolean, data: object, error: string }
 */
const deleteTask = async (db, taskId) => {
    try {
        // Buscar que exista la tarea antes de eliminarla
        const task = await db.get('SELECT * FROM tasks WHERE id = ?', taskId);
        
        if (!task) {
            return {
                success: false,
                error: "Task not found"
            };
        }

        // Eliminar la tarea
        await db.run('DELETE FROM tasks WHERE id = ?', taskId);

        return {
            success: true,
            data: task
        };
    } catch (err) {
        return {
            success: false,
            error: err.message
        };
    }
};

module.exports = {
    getTasksByProjectId,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
};
