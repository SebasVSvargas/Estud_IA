// "Base de datos" en memoria
let projects = [
    { id: 1, name: "Viviendas del claro", description: "Mixto" },
    { id: 2, name: "Edificio Norte", description: "Urbano" },
    { id: 3, name: "Colina Verde", description: "Campestre" }
];

// GET - Obtener todos los proyectos
const getAllProjects = (req, res) => {
    res.json(projects);
};

// GET - Obtener un proyecto por ID
const getProjectById = (req, res) => {
    const projectId = parseInt(req.params.id);
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
        return res.status(404).json({ error: "Proyecto no encontrado" });
    }
    
    res.json(project);
};

// POST - Crear nuevo proyecto
const createProject = (req, res) => {
    const { name, description } = req.body;
    
    if (!name || !description) {
        return res.status(400).json({ error: "Name y description son requeridos" });
    }
    
    const newProject = {
        id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
        name,
        description
    };
    
    projects.push(newProject);
    res.status(201).json({ message: "Proyecto creado", project: newProject });
};

// PUT - Actualizar proyecto
const updateProject = (req, res) => {
    const projectId = parseInt(req.params.id);
    const { name, description } = req.body;
    
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
};

// DELETE - Eliminar proyecto
const deleteProject = (req, res) => {
    const projectId = parseInt(req.params.id);
    const index = projects.findIndex(p => p.id === projectId);
    
    if (index === -1) {
        return res.status(404).json({ error: "Proyecto no existe" });
    }
    
    const deletedProject = projects.splice(index, 1);
    res.status(200).json({ message: "Proyecto Eliminado", project: deletedProject[0] });
};


module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};