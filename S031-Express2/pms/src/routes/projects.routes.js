const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');
const { getTasksByProjectId, createTask } = require('../controllers/tasksController');
const validateProject = require('../middleware/validateProject');
const validateTask = require('../middleware/validateTaskStatus');

const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');

// GET routes


//** 
// */
router.get('/', projectsController.getAllProjects);
router.get('/:id', projectsController.getProjectById);
router.get('/:projectId/tasks', getTasksByProjectId);

// POST routes
// router.post('/', validateProject, projectsController.createProject);

/**
 * @openapi
 * /api/projects:
 *   post:
 *     summary: Crea un nuevo proyecto
 *     description: Crea un nuevo proyecto con los datos proporcionados
 *     tags: [Projects]
 *     security:
 *          - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *             required:
 *              - name               
 *     responses:
 *       201:
 *         description: Proyecto creado exitosamente
 *       400:
 *         description: Solicitud inválida
 */
router.post('/', 
    authenticate, 
    authorize(['admin', 'user']), 
    validateProject, 
    projectsController.createProject);

router.post('/:projectId/tasks', authenticate, authorize(['admin', 'user']), validateTask, createTask);

// PUT routes
router.put('/:id', authenticate, authorize(['admin', 'user']), validateProject, projectsController.updateProject);

// DELETE routes
router.delete('/:id', authenticate, authorize(['admin']), projectsController.deleteProject);

module.exports = router;