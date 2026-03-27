
const express = require('express')
const router = express.Router()

const { 
    getTasksByProjectId,
    createTask, 
    getTaskById, 
    updateTask, 
    deleteTask,
    getCurrentUser
} = require('../controllers/tasksController')
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');


router.get('/me', authenticate, getCurrentUser)

router.get('/:id', authenticate, getTaskById)
router.put('/:id', authenticate, authorize(['admin', 'user']), updateTask)
router.delete('/:id', authenticate, authorize(['admin']), deleteTask)



module.exports = router;