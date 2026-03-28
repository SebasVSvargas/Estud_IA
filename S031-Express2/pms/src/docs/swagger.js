const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {   
        openapi: '3.0.0',
        info: {
            title: 'Project Management API',
            version: '1.0.0',
            description: 'API para gestionar proyectos y tareas',
        },
        servers: [
            {
                url: '/', //'http://localhost:3000/',
                description: 'Servidor local'
            }
        ]
    },

    apis: ['./src/routes/*.js', './src/controllers/*.js', './src/auth/*.js'] // Rutas donde se encuentran los endpoints y modelos para generar la documentación
};

const swaggerSpecs = swaggerJsdoc(options);

module.exports = swaggerSpecs;