
const validateProject = (req, res, next) => {

    const { name } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({ error: "El campo 'name' es requerido y no puede estar vacío" });
    }

    next();
}

module.exports = validateProject;