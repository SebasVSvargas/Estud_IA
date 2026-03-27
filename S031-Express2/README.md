# PMS - Project Management System (Backend)

Sistema de gestión de proyectos. Backend creado con **Express.js**, **SQLite** y **JavaScript**. Este es el **servidor/API** que maneja la lógica de negocio y la base de datos.

---

## 📦 Librerías Instaladas y Sus Usos

### Dependencias Principales (`npm install`)

| Librería | Versión | Propósito | Comando |
|----------|---------|----------|---------|
| **express** | ^5.2.1 | Framework web para crear el servidor y rutas HTTP | `npm install express` |
| **sqlite3** | ^6.0.1 | Driver para conectar a base de datos SQLite | `npm install sqlite3` |
| **sqlite** | ^5.1.1 | Wrapper para sqlite3 con promesas y async/await | `npm install sqlite` |
| **dotenv** | ^17.3.1 | Cargar variables de entorno desde `.env` | `npm install dotenv` |
| **jsonwebtoken** | ^9.0.3 | Crear y validar tokens JWT para autenticación | `npm install jsonwebtoken` |
| **bcrypt** | ^6.0.0 | Encriptar contraseñas de forma segura | `npm install bcrypt` |

### Dependencias de Desarrollo (`npm install --save-dev`)

| Librería | Versión | Propósito |
|----------|---------|----------|
| **nodemon** | ^3.1.14 | Reinicia el servidor automáticamente al guardar cambios |

---

## 📁 Estructura del Proyecto

```
pms/
│
├── src/
│   ├── server.js                 # 🚀 Punto de entrada (inicia el servidor)
│   ├── app.js                    # ⚙️ Configuración de Express
│   │
│   ├── database/
│   │   └── db.js                 # 🗄️ Conexión e inicialización de BD
│   │
│   ├── routes/
│   │   └── index.js              # 🛣️ Definición de endpoints
│   │
│   ├── controllers/
│   │   ├── projectsController.js # 📋 Lógica de proyectos (req/res)
│   │   └── tasksController.js    # 📋 Lógica de tareas (req/res)
│   │
│   ├── services/
│   │   ├── projects.service.js   # 🔧 Lógica de negocio proyectos
│   │   └── tasks.service.js      # 🔧 Lógica de negocio tareas
│   │
│   ├── middleware/
│   │   ├── loggers.js            # 📝 Middleware de logs
│   │   └── errorHandler.js       # ⚠️ Middleware de errores
│   │
│   └── utils/
│       └── (funciones auxiliares)
│
├── database.sqlite               # 🗄️ Archivo de la base de datos
├── .env                          # 🔐 Variables de entorno (NO SUBIR A GIT)
├── .gitignore                    # 📌 Archivos a ignorar en Git
├── package.json                  # 📦 Dependencias del proyecto
├── node_modules/                 # 📚 Dependencias instaladas (NO SUBIR A GIT)
└── README.md                     # 📖 Este archivo
```

---

## 🔄 Flujo de la Arquitectura

La solicitud pasa por estas capas de forma **secuencial**:

```
Cliente (Frontend)
    ↓
    HTTP Request (GET, POST, PUT, DELETE)
    ↓
Routes (http://localhost:3000/api/projects)
    ↓
Controllers (Parsean req/res)
    ↓
Services (Lógica de negocio pura)
    ↓
Database (SQLite) - Lectura/Escritura
    ↓
Services (Retorna resultado)
    ↓
Controllers (Formatea respuesta)
    ↓
HTTP Response (JSON)
    ↓
Cliente (Frontend)
```

---

## 🗄️ Base de Datos - SQLite

### ¿Qué es SQLite?
- Base de datos **relacional** ligera
- Se guarda en un **archivo único** (`database.sqlite`)
- **No requiere servidor** (perfecto para aprender)
- Ideal para desarrollo y pequeños proyectos

### Tablas Creadas

#### Tabla: `projects`
```sql
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Tabla: `tasks`
```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    projectId INTEGER NOT NULL,
    status TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (projectId) REFERENCES projects(id)
);
```

### Inicialización Automática
Las tablas se crean automáticamente cuando llamas a `initializeDB()` en `database/db.js`.

---

## 🔐 Autenticación con JWT

Creamos un sistema de autenticación básico usando **JSON Web Tokens (JWT)**. Esto permite que el frontend se autentique y acceda a rutas protegidas.

  ### flujo de autenticación:

  - Client -> login (email + password)
  - Server -> verifica credenciales
  - Server -> genera JWT (con id, name, email)
  - Client -> recibe JWT y lo almacena (localStorage/sessionStorage)
  - Client -> envía JWT en headers para acceder a rutas protegidas
  - Server -> verifica JWT en cada solicitud protegida

  ### JWT Json Web Token
  - Es un token firmado que contiene información del usuario
  ```javascript
  jwt.sign({ id, name, email }, JWT_SECRET, { expiresIn: '1h' })
  ```
  HEADER: Authorization (Bearer TOKEN)
  PAYLOAD: { id, name, email }
  SIGNATURE: Firma con JWT_SECRET

---

## Autorización - Middleware `authenticate`

  Es una segunda capa de seguridad que verifica el JWT en cada solicitud a rutas protegidas. Si el token es válido, permite el acceso; si no, devuelve un error 401.

  Roles: admin (Todo), user (Crear tareas y proyectos), guest (Solo lectura)


  ```javascript
  function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: 'Token inválido' });
      req.user = user; // Agrega info del usuario al request
      next(); // Continúa a la siguiente función
    });
  }
  ```




---

## 🚀 Cómo Ejecutar el Proyecto

### 1. Instalar dependencias
```bash
cd pms
npm install
```

### 2. Crear archivo `.env`
```env
PORT=3000
NODE_ENV=development
```

### 3. Ejecutar en desarrollo (con nodemon)
```bash
npm run dev
```

Verás en la terminal:
```
Base de datos inicializada
Servidor ejecutándose en http://localhost:3000
```

### 4. Probar la API
Abre Postman o usa cURL:
```bash
curl http://localhost:3000/
```

---

## 🧪 Testear Endpoints

### Con Postman

**GET** - Obtener tareas por proyecto
```
GET http://localhost:3000/api/projects/1/tasks
```

**POST** - Crear nueva tarea
```
POST http://localhost:3000/api/projects/1/tasks
Body (JSON):
{
  "title": "Implementar API",
  "status": "InProgress"
}
```

**PUT** - Actualizar tarea
```
PUT http://localhost:3000/api/tasks/1
Body (JSON):
{
  "title": "Implementar API v2",
  "status": "Done"
}
```

**DELETE** - Eliminar tarea
```
DELETE http://localhost:3000/api/tasks/1
```

---

## 🌐 Frontend - ¿Dónde va? ¿Cómo se conecta?

### Arquitectura Cliente-Servidor

```
┌─────────────────────────────────┐
│      FRONTEND (React/Vue)       │
│  - Interfaz de Usuario (UI)     │
│  - Formularios                  │
│  - Botones, Listas              │
│  Puerto: http://localhost:3173  │
└──────────────────┬──────────────┘
                   │
                   │ HTTP llamadas (fetch/axios)
                   │
         ┌─────────▼──────────┐
         │  API REST (Express)│
         │  Puerto: 3000      │
         │─────────────────────
         │  Rutas: /api/*
         │  Base de datos
         └────────────────────┘
```

### Paquetes Necesarios para Frontend

Si quieres crear el frontend en el **mismo proyecto** (monorepo):

```bash
# Crear frontend con Vite + React
npm create vite@latest frontend -- --template react

# O con Vue
npm create vite@latest frontend -- --template vue
```

O crear **proyecto separado** (más limpio):
```bash
# En otra carpeta
npx create-react-app my-frontend
# O
npm create vite@latest my-frontend -- --template react
```

### Paquetes Frontend Recomendados

```bash
# Para comunicación con API
npm install axios

# Para gestionar estado
npm install zustand  # o Redux, Context API

# Para enrutamiento (si usas React)
npm install react-router-dom

# Para UI bonita
npm install @shadcn/ui  # o Material-UI, Tailwind CSS

# Para validación de formularios
npm install react-hook-form
```

### Ejemplo: Conectar Frontend con Backend

**React haciendo petición al backend:**

```javascript
import axios from 'axios';
import { useState, useEffect } from 'react';

export function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Conectar al backend en puerto 3000
    axios.get('http://localhost:3000/api/projects/1/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>{task.title} - {task.status}</li>
      ))}
    </ul>
  );
}
```

---

## 📌 Habilitación de CORS (Importante para Frontend)

El frontend (localhost:3173) y backend (localhost:3000) tienen diferente **origen**. Necesitas permitir CORS:

### 1. Instalar cors
```bash
npm install cors
```

### 2. Agregar a `src/app.js`
```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3173', // Tu frontend
  credentials: true
}));

app.use(express.json());
```

---

## 📊 Estructura de Carpetas: Backend + Frontend Juntos

### Opción 1: Mismo Repositorio (Monorepo)
```
PMS/
├── backend/              # Backend Express
│   ├── src/
│   ├── package.json
│   └── ...
├── frontend/             # Frontend React
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md
```

### Opción 2: Repositorios Separados (Recomendado)
```
pms-backend/             # Este proyecto
├── src/
├── package.json

pms-frontend/            # Otro proyecto
├── src/
├── package.json
```

---

## 🔐 Variables de Entorno - `.env`

```env
# Servidor
PORT=3000
NODE_ENV=development

# Base de datos
DATABASE_PATH=./database.sqlite

# Autenticación
JWT_SECRET=tu_secreto_super_seguro_aqui
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:3173
```

---

## ✅ Checklist - Estructura Completa

- [ ] Backend iniciado con `npm run dev`
- [ ] Puedo acceder a `http://localhost:3000`
- [ ] Base de datos `database.sqlite` se crea automáticamente
- [ ] Endpoints funcionando en Postman
- [ ] Frontend creado (React/Vue) en otra carpeta
- [ ] Frontend hace peticiones al backend (axios)
- [ ] CORS habilitado en backend
- [ ] Frontend e backend se comunican correctamente

---

## 🚄 Próximos Pasos

1. **Crear Frontend** - React o Vue en otra carpeta
2. **Conectar Frontend con Backend** - Axios + Variables de entorno
3. **Autenticación** - JWT (jsonwebtoken) + bcrypt
4. **Validación de datos** - Joi o Zod
5. **Logging** - Morgan
6. **Testing** - Jest (backend) + Vitest (frontend)
7. **Desplegar** - Vercel (frontend) + Railway/Render (backend)

---

**¡Ya tienes un proyecto Full-Stack listo para empezar!** 🚀

