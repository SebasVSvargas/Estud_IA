
//Aca se configura el servidor, se importan las rutas y se exporta el app para ser usado en server.js

const express = require('express');
const routes = require('./routes');
const logger = require('./middleware/loggers');
const errorHandler = require('./middleware/errorHandler');

const app = express();

//Middlewares - Ejecutarlos antes de las rutas
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use(logger);

// Rutas raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a mi servidor Express!');
});

// Cargar todas las rutas con prefijo /api
app.use('/api', routes); // ← Dice: "usa todas las rutas desde routes/"


//Manejo de errores después de ejecutar las rutas
app.use(errorHandler);


module.exports = app;