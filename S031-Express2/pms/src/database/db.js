
//Creacion de conexion a la base de datos SQLite
const sqlite3 = require('sqlite3').verbose(); 
const {open} = require('sqlite');

async function connectDB() {
    return open({
        filename: './database.sqlite', //de momento se guarda en un archivo local, pero se puede configurar para usar una base de datos en la nube o en otro servidor
        driver: sqlite3.Database
    });
}

async function initializeDB() {
    const db = await connectDB();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            status TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );       


        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            role TEXT DEFAULT 'user'
        );

        -- ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user';

        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT DEFAULT 'pending',
            priority TEXT DEFAULT 'medium',
            project_id INTEGER,
            user_id INTEGER,
            due_date DATETIME,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (project_id) REFERENCES projects(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `);
    return db;
}

module.exports = { connectDB, initializeDB };