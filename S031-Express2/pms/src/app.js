//Aca se configura el servidor, se importan las rutas y se exporta el app para ser usado en server.js

//Request -> se ejecuta de forma secuencial -> response
//Request -> instanciar BD -> logger(Middleware) -> rutas -> errorHandler(Middleware) -> response

const express = require('express');
const routes = require('./routes');
const logger = require('./middleware/loggers');
const errorHandler = require('./middleware/errorHandler');
const initializeDB = require('./database/db').initializeDB;


const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const initDB = initializeDB().then((db) => {
    app.locals.db = db; // Guardar la instancia de la base de datos en app.locals para que esté disponible en toda la aplicación
    console.log("Base de datos inicializada");
}).catch(err => {
    console.error("Error al inicializar la base de datos", err);
});
// Exportar tanto app como la promesa de inicialización
app.initDB = initDB;

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