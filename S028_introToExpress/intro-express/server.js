
const express = require('express');
const app = express();
const PORT = 3000; // You can choose any port you like, but 3000 is commonly used for development

// Define a route for the root URL ("/") - Ruta raíz ("/")
app.get('/', (req, res) => {
    res.send('Bienvenido a mi servidor Express!'); // Send a response to the client
});

app.get("/api/projects", (req, res) => {
    const projects = [
        { id: 1, name: "Viviendas del claro", description: "Mixto" },
        { id: 2, name: "Edificio Norte", description: "Urbano" },
        { id: 3, name: "Colina Verde", description: "Campestre" }
    ];
    res.json(projects); // Send the projects array as a JSON response
});

app.get("/api/projects/:id", (req, res) => {
    const projectId = parseInt(req.params.id); // Get the project ID from the URL parameters
    const project = { 
        id: projectId, 
        name: `Nombre Proyecto: ${projectId}`, 
        description: `Descripción del Proyecto: ${projectId}` };
    res.json(project); // Send the project details as a JSON response
});

app.get("/users", (req, res) => {
    res.send("Mas de 1000 usuarios registrados");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`); // 127.0.0.1 is the loopback address, equivalent to localhost
});


// Middleware to parse JSON bodies
app.use(express.json());

