
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env; 

const registerUser = async (db, data) => {

    try {
        

        const { name, email, password, role } = data;
        
        if (!name || !email || !password) {
            return { success: false, error: "Name, email y password son requeridos" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await db.run(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role || 'user']
        );

        const newUser = await db.get('SELECT id, name, email, role FROM users WHERE id = ?', result.lastID);

        return { 
            success: true, 
            data: newUser };
        
    } catch (err) {
        return { success: false, error: err.message };
    }
}


const loginUser = async (db, data) => {

    const { email, password } = data;

    if (!email || !password) {
        return { success: false, error: "Email y password son requeridos" };
    }

    const user = await db.get('SELECT * FROM users WHERE email = ?', email);

    if (!user) {
        return { success: false, error: "Usuario no encontrado" };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return { success: false, error: "Contraseña incorrecta" };
    }

    const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email, role: user.role }, 
        JWT_SECRET, 
        { expiresIn: '1h' }
    );

    return { 
        success: true, 
        data: { token } 
    };

}

module.exports = {
    registerUser,
    loginUser
};