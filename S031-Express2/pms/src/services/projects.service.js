
const getAllProjects = async (db) => {
    return await db.all("SELECT * FROM projects");
}

const getProjectById = async (db, id) => {
    return await db.get("SELECT * FROM projects WHERE id = ?", [id]);
}

const createProject = async (db, data) => {
    const { name, description, status } = data;

    if (!name || !description) {
        throw new Error("Name y description son requeridos");
    }

    const result = await db.run(
        "INSERT INTO projects (name, description, status) VALUES (?, ?, ?)", [name, description, status]
    );
    return { 
        id: result.lastID, 
        name, 
        description, 
        status 
    };
}

const updateProject = async (db, id, data) => {
    const { name, description, status } = data;

    if (!name || !description) {
        throw new Error("Name y description son requeridos");
    }

    await db.run(
        "UPDATE projects SET name = ?, description = ?, status = ? WHERE id = ?", [name, description, status, id]
    );
    return await getProjectById(db, id);
}   

const deleteProject = async (db, id) => {
    const project = await getProjectById(db, id);
    if (!project) {
        throw new Error("Proyecto no encontrado");
    }
    await db.run("DELETE FROM projects WHERE id = ?", [id]);
    return project;
}


module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};