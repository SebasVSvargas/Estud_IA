
const authService = require('./auth.service');

const register = async (req, res) => {
    const db = req.app.locals.db;
    const user = await authService.registerUser(db, req.body);
    res.status(201).json(user);
}

const login = async (req, res) => {
    const db = req.app.locals.db;
    const result = await authService.loginUser(db, req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error });
    }
    res.json({ token: result.data.token });
}

module.exports = {
    register,
    login
}
