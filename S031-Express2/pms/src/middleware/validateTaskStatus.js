
const validateStatus = (req, res, next) => {
    
    const { status } = req.body;

    const validStatuses = ["ToDo", "InProgress", "Done"];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: `Estado de tarea inválido - 
            use uno de los siguientes: ${validStatuses.join(", ")}` });
    }

    next()
}

module.exports = validateStatus;