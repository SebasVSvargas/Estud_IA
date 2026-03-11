# Crear un Proyecto Express desde Cero

Guía completa para crear un proyecto backend con **Express.js** y **JavaScript**.

---

## 1. Requisitos Previos

- **Node.js** instalado (versión 14 o superior)
- **npm** (se instala automáticamente con Node.js)
- Un editor de código (VS Code recomendado)
- Terminal/CMD accesible

Verifica que tengas Node.js instalado:
```bash
node --version
npm --version
```

---

## 2. Crear la Carpeta del Proyecto

```bash
# Crear carpeta
mkdir mi-proyecto-express

# Navegar a la carpeta
cd mi-proyecto-express
```

---

## 3. Inicializar el Proyecto con npm

```bash
npm init -y
```

Esto crea un archivo `package.json` con la configuración básica del proyecto.

---

## 4. Instalar Express

```bash
npm install express
```

También es recomendable instalar estas herramientas útiles:

```bash
# Nodemon: reinicia el servidor automáticamente al detectar cambios
npm install --save-dev nodemon

# Dotenv: para manejar variables de entorno
npm install dotenv
```

---

## 5. Estructura del Proyecto

Crea la siguiente estructura de carpetas:

```
mi-proyecto-express/
│
├── src/
│   ├── app.js              # Configuración de Express
│   ├── server.js           # Punto de entrada
│   ├── routes/
│   │   └── index.js        # Rutas principales
│   ├── controllers/        # Lógica de negocio
│   ├── middleware/         # Middlewares personalizados
│   └── utils/             # Funciones auxiliares
│
├── .env                    # Variables de entorno
├── .gitignore             # Archivos a ignorar en Git
├── package.json           # Dependencias del proyecto
└── README.md              # Documentación
```

---

## 6. Archivos Base

### 6.1 `package.json` - Configurar scripts

Modifica la sección `"scripts"` en tu `package.json`:

```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

### 6.2 `src/app.js` - Configuración de Express

```javascript
const express = require('express');
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.json({ mensaje: '¡Bienvenido a Express!' });
});

module.exports = app;
```

### 6.3 `src/server.js` - Punto de Entrada

```javascript
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
```

### 6.4 `.env` - Variables de Entorno

```
PORT=3000
NODE_ENV=development
DATABASE_URL=
```

### 6.5 `.gitignore` - Archivos a Ignorar

```
node_modules/
.env
.env.local
.env.*.local
dist/
build/
*.log
.DS_Store
```

---

## 7. Ejecutar el Proyecto

### Modo Desarrollo (con nodemon)

```bash
npm run dev
```

El servidor se reiniciará automáticamente al guardar cambios.

### Modo Producción

```bash
npm start
```

---

## 8. Estructura Recomendada - Ejemplo Expandido

### 8.1 `src/routes/index.js` - Rutas Organizadas

```javascript
const express = require('express');
const router = express.Router();

// Rutas de ejemplo
router.get('/api/usuarios', (req, res) => {
  res.json({ usuarios: [] });
});

router.post('/api/usuarios', (req, res) => {
  const { nombre, email } = req.body;
  res.status(201).json({ 
    mensaje: 'Usuario creado',
    usuario: { nombre, email }
  });
});

module.exports = router;
```

### 8.2 `src/app.js` - Con Rutas Integradas

```javascript
const express = require('express');
const routes = require('./routes');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Petición de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: '¡Servidor Express activo!' });
});

// Usar rutas
app.use('/', routes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;
```

### 8.3 `src/controllers/usuariosController.js` - Lógica de Negocio

```javascript
// Simulación de base de datos en memoria
const usuarios = [];

const obtenerUsuarios = (req, res) => {
  res.json(usuarios);
};

const crearUsuario = (req, res) => {
  const { nombre, email } = req.body;
  
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email requeridos' });
  }
  
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    email,
    fechaCreacion: new Date()
  };
  
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
};

const obtenerUsuarioPorId = (req, res) => {
  const { id } = req.params;
  const usuario = usuarios.find(u => u.id === parseInt(id));
  
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  
  res.json(usuario);
};

module.exports = {
  obtenerUsuarios,
  crearUsuario,
  obtenerUsuarioPorId
};
```

---

## 9. Comandos Útiles

```bash
# Instalar una dependencia
npm install nombre-paquete

# Instalar una dependencia de desarrollo
npm install --save-dev nombre-paquete

# Ver lista de dependencias
npm list

# Actualizar dependencias
npm update

# Limpiar caché de npm
npm cache clean --force
```

---

## 10. Paquetes Recomendados Adicionales

```bash
# CORS: Permitir requests desde otros orígenes
npm install cors

# Validación de datos
npm install joi

# Documentación automática de API
npm install swagger-ui-express swagger-jsdoc

# Seguridad HTTP
npm install helmet

# Morgan: Logger de requests
npm install morgan
```

**Ejemplo de uso:**

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// ... resto del código
```

---

## 11. Probando la API

### Con cURL

```bash
# GET
curl http://localhost:3000/

# POST
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan","email":"juan@example.com"}'
```

### Con Postman

1. Descarga [Postman](https://www.postman.com/downloads/)
2. Crea una nueva petición
3. Selecciona el método (GET, POST, etc.)
4. Introduce la URL: `http://localhost:3000`
5. Envía la petición

---

## 12. Variables de Entorno con .env

### Instalar dotenv

```bash
npm install dotenv
```

### En `src/server.js`

```javascript
require('dotenv').config();

const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
```

---

## 13. Resumen Checklist

- [ ] Node.js instalado
- [ ] Crear carpeta del proyecto
- [ ] `npm init -y`
- [ ] `npm install express`
- [ ] `npm install --save-dev nodemon`
- [ ] Crear estructura de carpetas
- [ ] Crear `src/app.js`
- [ ] Crear `src/server.js`
- [ ] Configurar scripts en `package.json`
- [ ] `npm run dev` o `npm start`
- [ ] Verificar que el servidor corre en `http://localhost:3000`

---

## 14. Próximos Pasos

Una vez tengas el servidor básico funcionando:

1. **Conectar a base de datos** (MongoDB, PostgreSQL, MySQL)
2. **Implementar autenticación** (JWT, sessions)
3. **Crear middlewares personalizados**
4. **Documentar API con Swagger**
5. **Agregar tests** (Jest, Mocha)
6. **Desplegar** (Heroku, Railway, Render, AWS)

---

**¡Listo! Ya tienes un proyecto Express funcional.** 🚀
