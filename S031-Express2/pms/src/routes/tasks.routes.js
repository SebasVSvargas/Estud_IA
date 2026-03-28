
const express = require('express')
const router = express.Router()

const { 
    getTasksByProjectId,
    createTask, 
    getTaskById, 
    updateTask, 
    deleteTask,
    getCurrentUser,
    listTasks
} = require('../controllers/tasksController')
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');


/**
* @openapi
* /api/tasks/listTasks:
*   get:
*     summary: Lista todas las tareas con paginación, filtrado y ordenamiento
*     tags: [Tasks]
*     responses:
*       200:
*         description: Lista de tareas obtenida exitosamente         
*       500:
*         description: Error del servidor
*/
router.get('/listTasks', listTasks)

router.get('/me', authenticate, getCurrentUser)

router.get('/:id', authenticate, getTaskById)
router.put('/:id', authenticate, authorize(['admin', 'user']), updateTask)
router.delete('/:id', authenticate, authorize(['admin']), deleteTask)



module.exports = router;