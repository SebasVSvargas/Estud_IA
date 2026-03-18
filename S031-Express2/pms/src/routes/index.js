const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

// GET routes
router.get('/api/projects', projectsController.getAllProjects);
router.get('/api/projects/:id', projectsController.getProjectById);
router.get('/users', (req, res) => {
    res.send("Mas de 1000 usuarios registrados");
});

// POST routes
router.post('/api/projects', projectsController.createProject);

// PUT routes
router.put('/api/projects/:id', projectsController.updateProject);

// DELETE routes
router.delete('/api/projects/:id', projectsController.deleteProject);

module.exports = router;