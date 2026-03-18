
//Aca se configura el servidor, se importan las rutas y se exporta el app para ser usado en server.js

const express = require('express');
const routes = require('./routes');

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a mi servidor Express!');
});

// Usar rutas de la API
app.use('/', routes); // ← Dice: "usa todas las rutas desde routes/"

module.exports = app;