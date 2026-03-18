
const express = require('express');
const app = express();
const PORT = 3000; // You can choose any port you like, but 3000 is commonly used for development

// Middleware to parse JSON bodies
app.use(express.json());

// Simulamos una "base de datos" en memoria
let projects = [
    { id: 1, name: "Viviendas del claro", description: "Mixto" },
    { id: 2, name: "Edificio Norte", description: "Urbano" },
    { id: 3, name: "Colina Verde", description: "Campestre" }
];


//#region GET requests

// Define a route for the root URL ("/") - Ruta raíz ("/")
app.get('/', (req, res) => {
    res.send('Bienvenido a mi servidor Express!'); // Send a response to the client
});

app.get("/api/projects/:id", (req, res) => {
    const projectId = parseInt(req.params.id); // Get the project ID from the URL parameters
    const project = projects.find(p => p.id === projectId);
    if (!project) {
        return res.status(404).json({ error: "Proyecto no encontrado" });
    }
    res.json(project); // Send the project details as a JSON response
});

app.get("/api/projects", (req, res)=>{
    // const proyectos = projects.map(p => ({ id: p.id, name: p.name })) // Solo enviamos id y name
    res.json(projects)
});

app.get("/users", (req, res) => {
    res.send("Mas de 1000 usuarios registrados");
});

//#endregion


//#region POST requests

// POST - Crear nuevo proyecto
app.post("/api/projects", (req, res) => {
    
    // req.body viene del JSON que envío en Postman
    const { name, description } = req.body;    
    
    if (!name || !description) {
        return res.status(400).json({ error: "Name y description son requeridos" });
    }    
    // Crear nuevo proyecto
    const newProject = {
        id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
        name,
        description
    };
    
    projects.push(newProject);
    res.status(201).json({ message: "Proyecto creado", project: newProject });
});

//#endregion


//#region PUT requests

app.put("/api/projects/:id", (req, res) => {

    const projectId = parseInt(req.params.id); // Get the project ID from the URL parameters
    const { name, description } = req.body; // Get the updated name and description from the request body

    const project = projects.find(p => p.id === projectId);
    if (!project) {
        return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    if (!name || !description) {
        return res.status(400).json({ error: "Name y description son requeridos" });
    }

    project.name = name;
    project.description = description;

    res.json({ message: "Proyecto actualizado", project });
});

//#endregion


//#region DELETE requests

app.delete("/api/projects/:id", (req, res)=>{

    const projectId = parseInt(req.params.id)
    const index = projects.findIndex(p => p.id === projectId)

    if(!index){
        return res.status(404).json({error: "Proyecto no existe"})
    }

    // projects = projects.filter(p => p.id !== projectId)
    // res.status(200).json({message: "Proyecto Eliminado", project: projectId })

    // Eliminar
    const deletedProject = projects.splice(index, 1);
    res.json({ message: "Proyecto eliminado", project: deletedProject[0] });
})


//#endregion










app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`); // 127.0.0.1 is the loopback address, equivalent to localhost
});




