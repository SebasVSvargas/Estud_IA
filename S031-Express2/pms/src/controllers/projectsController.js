//// "Base de datos" en memoria
// let projects = [
//     { id: 1, name: "Viviendas del claro", description: "Mixto", status: "En progreso" },
//     { id: 2, name: "Edificio Norte", description: "Urbano", status: "Completado" },
//     { id: 3, name: "Colina Verde", description: "Campestre", status: "ToDo" }
// ];


const projectsService = require('../services/projects.service');

// GET - Obtener todos los proyectos
const getAllProjects = async (req, res) => {

    //throw new Error("Error simulado para testing de errorHandler")
    // res.json(projects);
    
    const db = req.app.locals.db; // Obtener la instancia de la base de datos desde app.locals

    const { status, description } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sort = req.query.sort || 'created_at';

    let query = "SELECT * FROM projects WHERE 1=1";
    let params = [];

    if (status) {
        query += " AND status = ?";
        params.push(status);
    }
    if (description) {
        query += " AND description LIKE ?";
        params.push(`%${description}%`);
    }
    
    query += ` ORDER BY ${sort} ASC`; //Debe ir antes de la paginacion
    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const projects = await db.all(query, params);

    // const projects = await projectsService.getAllProjects(db)

    res.json(projects);
};

// GET - Obtener un proyecto por ID
const getProjectById = (req, res) => {    
    // const projectId = parseInt(req.params.id);
    // const project = projects.find(p => p.id === projectId);
    
    // if (!project) {
    //     return res.status(404).json({ error: "Proyecto no encontrado" });
    // }
    
    // res.json(project);


    const db = req.app.locals.db;
    const projectId = parseInt(req.params.id);
    const project = projectsService.getProjectById(db, projectId);

    if (!project) {
        return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    res.json(project);
};

// POST - Crear nuevo proyecto
const createProject = async (req, res) => {
    const db = req.app.locals.db;
    const project = await projectsService.createProject(db, req.body);
    res.status(201).json({ message: "Proyecto creado", project });
};


// PUT - Actualizar proyecto
const updateProject = (req, res) => {
    // const projectId = parseInt(req.params.id);
    // const { name, description } = req.body;
    
    // const project = projects.find(p => p.id === projectId);
    
    // if (!project) {
    //     return res.status(404).json({ error: "Proyecto no encontrado" });
    // }
    
    // if (!name || !description) {
    //     return res.status(400).json({ error: "Name y description son requeridos" });
    // }
    
    // project.name = name;
    // project.description = description;
    
    // res.json({ message: "Proyecto actualizado", project });

    const db = req.app.locals.db;
    const projectId = parseInt(req.params.id);
    const updatedProject = projectsService.updateProject(db, projectId, req.body);
    
    if (!updatedProject) {
        return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    res.json({ message: "Proyecto actualizado", project: updatedProject });
};

// DELETE - Eliminar proyecto
const deleteProject = (req, res) => {
    // const projectId = parseInt(req.params.id);
    // const index = projects.findIndex(p => p.id === projectId);
    
    // if (index === -1) {
    //     return res.status(404).json({ error: "Proyecto no existe" });
    // }
    
    // const deletedProject = projects.splice(index, 1);
    // res.status(200).json({ message: "Proyecto Eliminado", project: deletedProject[0] });

    const db = req.app.locals.db
    const projectId = parseInt(req.params.id);
    const deletedProject = projectsService.deleteProject(db, projectId);

    if (!deletedProject) {
        return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    res.status(200).json(
        { message: "Proyecto Eliminado", 
            project: deletedProject 
        });
};


module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};