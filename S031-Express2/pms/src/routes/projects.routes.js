const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');
const { getTasksByProjectId, createTask } = require('../controllers/tasksController');
const validateProject = require('../middleware/validateProject');
const validateTask = require('../middleware/validateTaskStatus')

// GET routes
router.get('/', projectsController.getAllProjects);
router.get('/:id', projectsController.getProjectById);
router.get('/:projectId/tasks', getTasksByProjectId);

// POST routes
router.post('/', validateProject, projectsController.createProject);
router.post('/:projectId/tasks', validateTask, createTask);

// PUT routes
router.put('/:id', validateProject, projectsController.updateProject);

// DELETE routes
router.delete('/:id', projectsController.deleteProject);

module.exports = router;