
const express = require('express');
const router = express.Router();

// Importar rutas
const projectRoutes = require('./projects.routes');
const taskRoutes = require('./tasks.routes');

// Usar rutas
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;