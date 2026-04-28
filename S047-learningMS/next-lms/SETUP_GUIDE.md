# Guía de Inicialización - Next.js LMS

## 📋 Contenido de esta guía

Esta guía está diseñada para ayudarte a poner en funcionamiento este proyecto Next.js desde cero, ya sea si lo descargaste de GitHub o si necesitas reinstalar todo de nuevo. Es perfecta para aprendices que están comenzando con Next.js y tecnologías modernas.

---

## 1️⃣ Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar](https://nodejs.org/)
- **npm** (normalmente viene con Node.js)
- **Git** (opcional, pero recomendado) - [Descargar](https://git-scm.com/)

### Verificar que todo está instalado:

```bash
node --version
npm --version
git --version
```

---

## 2️⃣ Instalación inicial desde GitHub

Si descargaste el proyecto de GitHub:

### Paso 1: Clona o descomprime el repositorio

```bash
# Si lo clonaste con Git
git clone <URL-del-repositorio>
cd S047-learningMS/next-lms

# O si descargaste como ZIP, simplemente navega a la carpeta
cd ruta/a/tu/carpeta/next-lms
```

### Paso 2: Instala las dependencias

```bash
npm install
```

Este comando lee el archivo `package.json` y descarga todas las librerías necesarias a la carpeta `node_modules/`.

### Paso 3: Configura las variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# En Windows (PowerShell)
echo "" > .env.local

# En macOS/Linux
touch .env.local
```

Luego, abre `.env.local` y añade las variables necesarias. Por ejemplo:

```env
# Base de datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_base_datos"

# NextAuth
NEXTAUTH_SECRET="tu-secreto-aqui" # Generalo con: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
NEXTAUTH_URL="http://localhost:3000"
```

### Paso 4: Inicializa Prisma

```bash
npx prisma generate
```

Este comando genera el cliente de Prisma basado en tu esquema.

### Paso 5: Ejecuta las migraciones de la base de datos

```bash
npx prisma migrate deploy
```

Este comando ejecuta todas las migraciones pendientes en tu base de datos.

### Paso 6: Inicia el servidor de desarrollo

```bash
npm run dev
```

¡El proyecto estará disponible en [http://localhost:3000](http://localhost:3000)!

---

## 3️⃣ Reinstalación completa (si algo se dañó)

Si experimentas problemas o sospechas que algo está mal, aquí está cómo hacer una reinstalación limpia:

### Paso 1: Elimina archivos temporales

```bash
# Elimina las dependencias instaladas
rm -r node_modules

# En Windows (PowerShell)
Remove-Item -Recurse -Force node_modules

# Elimina el archivo de bloqueo de npm
rm package-lock.json

# En Windows (PowerShell)
Remove-Item -Force package-lock.json
```

### Paso 2: Limpia el cache de npm

```bash
npm cache clean --force
```

### Paso 3: Reinstala todo desde cero

```bash
npm install
```

### Paso 4: Verifica que todo funciona

```bash
npm run dev
```

---

## 4️⃣ Instalación de dependencias desde cero (sin package.json)

Si por alguna razón no tienes el archivo `package.json`, aquí está cómo recrear este proyecto:

### Opción A: Crear proyecto nuevo con Create Next App

```bash
# Crea un nuevo proyecto Next.js
npx create-next-app@latest next-lms --typescript --tailwind

# Durante la instalación, elige estas opciones:
# ✔ Would you like to use TypeScript? › Yes
# ✔ Would you like to use ESLint? › Yes
# ✔ Would you like to use Tailwind CSS? › Yes
# ✔ Would you like to use `src/` directory? › Yes
# ✔ Would you like to use App Router? › Yes
# ✔ Would you like to customize the default import alias? › No

cd next-lms
```

### Opción B: Instalar dependencias manualmente

Si ya tienes el proyecto base, instala las dependencias una por una:

#### Dependencias principales:

```bash
npm install next@16.2.4 react@19.2.4 react-dom@19.2.4
npm install @prisma/client@^7.7.0 @prisma/adapter-pg@^7.7.0
npm install prisma@^7.7.0
npm install next-auth@^5.0.0-beta.31
npm install pg@^8.20.0
npm install bcryptjs@^3.0.3
npm install zod@^4.3.6
npm install @tanstack/react-query@^5.99.2
npm install lucide-react@^1.8.0
npm install clsx@^2.1.1
npm install tailwind-merge@^3.5.0
```

#### Dependencias de desarrollo:

```bash
npm install --save-dev typescript@^5
npm install --save-dev @types/node@^20
npm install --save-dev @types/react@^19
npm install --save-dev @types/react-dom@^19
npm install --save-dev @types/bcryptjs@^2.4.6
npm install --save-dev eslint@^9
npm install --save-dev eslint-config-next@16.2.4
npm install --save-dev tailwindcss@^4
npm install --save-dev @tailwindcss/postcss@^4
```

---

## 5️⃣ Configuración de Prisma

### Paso 1: Inicializa Prisma

```bash
npx prisma init
```

Este comando crea dos archivos importantes:
- `.env` - para las variables que Prisma necesita en CLI
- `prisma/schema.prisma` - donde definen tu estructura de base de datos

### Paso 2: Configura tu base de datos

Edita `.env` y configura tu `DATABASE_URL`. Si tu app Next.js también necesita leerla en runtime, puedes duplicarla en `.env.local`. Ejemplos:

#### Para PostgreSQL:
```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_base_datos"
```

#### Para MySQL:
```env
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_base_datos"
```

#### Para SQLite:
```env
DATABASE_URL="file:./dev.db"
```

### Paso 3: Define tu esquema

Edita `prisma/schema.prisma` con tus modelos. En Prisma 7 con `prisma.config.ts`, la URL ya no va dentro del schema. Ejemplo básico:

```prisma
datasource db {
  provider = "postgresql"
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  name      String?
  createdAt DateTime @default(now())
}
```

Y en `prisma.config.ts`:

```ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
```

### Paso 4: Crea una migración

```bash
npx prisma migrate dev --name init
```

Este comando:
- Crea la carpeta `prisma/migrations/`
- Genera una migración SQL
- Ejecuta la migración en tu base de datos
- Regenera el cliente de Prisma

### Paso 5: Visualiza tu base de datos (opcional)

```bash
npx prisma studio
```

Esto abre una interfaz web donde puedes ver y manipular los datos de tu base de datos.

---

## 6️⃣ Estructura del proyecto

Aquí está cómo está organizado el proyecto:

```
next-lms/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Página de inicio
│   │   └── globals.css         # Estilos globales
│   ├── components/             # Componentes reutilizables
│   │   ├── dashboard/
│   │   ├── forms/
│   │   ├── landing/
│   │   ├── layout/
│   │   └── ui/
│   ├── services/               # Servicios (APIs, etc.)
│   ├── lib/                    # Funciones utilitarias
│   ├── hooks/                  # Custom hooks
│   ├── types/                  # TypeScript types
│   └── config/                 # Configuraciones
├── prisma/
│   ├── schema.prisma           # Definición de modelos
│   └── migrations/             # Historial de cambios BD
├── public/                     # Archivos estáticos
├── .env.local                  # Variables de entorno (NO commits)
├── package.json                # Dependencias del proyecto
├── tsconfig.json               # Configuración TypeScript
├── next.config.ts              # Configuración Next.js
└── tailwind.config.ts          # Configuración Tailwind CSS
```

---

## 7️⃣ Comandos útiles

### Desarrollo:

```bash
# Inicia el servidor de desarrollo
npm run dev

# Inicia el servidor de desarrollo en otro puerto
npm run dev -- -p 3001

# Compila el proyecto
npm build

# Inicia el servidor en producción
npm start

# Ejecuta el linter
npm run lint
```

### Base de datos:

```bash
# Abre Prisma Studio (UI para la BD)
npx prisma studio

# Genera el cliente de Prisma
npx prisma generate

# Crea una nueva migración
npx prisma migrate dev --name nombre-migracion

# Revierte la última migración
npx prisma migrate resolve --rolled-back

# Muestra el estado de las migraciones
npx prisma migrate status
```

### Npm:

```bash
# Instala una nueva dependencia
npm install nombre-paquete

# Instala una dependencia de desarrollo
npm install --save-dev nombre-paquete

# Desinstala una dependencia
npm uninstall nombre-paquete

# Actualiza todas las dependencias
npm update

# Verifica dependencias obsoletas
npm outdated
```

---

## 8️⃣ Solución de problemas comunes

### ❌ "Cannot find module 'next'"

**Solución:** Las dependencias no están instaladas correctamente.

```bash
rm -r node_modules package-lock.json
npm cache clean --force
npm install
```

### ❌ "prisma command not found"

**Solución:** Instala Prisma globalmente o usa `npx`:

```bash
# Opción 1: Instalar globalmente
npm install -g prisma

# Opción 2: Usar con npx (recomendado)
npx prisma --version
```

Si PowerShell bloquea `npx` con `running scripts is disabled on this system`, ejecútalo así en Windows:

```bash
cmd /c npx prisma generate
```

### ❌ "Error: connect ECONNREFUSED"

**Solución:** La base de datos no está corriendo. Verifica que PostgreSQL/MySQL esté iniciado y que `DATABASE_URL` sea correcto.

```bash
# Para PostgreSQL en Windows
# Abre Services y reinicia el servicio PostgreSQL

# Para ver la conexión actual
echo $DATABASE_URL  # macOS/Linux
echo %DATABASE_URL%  # Windows
```

### ❌ "Port 3000 already in use"

**Solución:** El puerto 3000 está ocupado.

```bash
# Usa otro puerto
npm run dev -- -p 3001

# O mata el proceso que está usando el puerto 3000
# En Windows (PowerShell)
Get-Process | Where-Object {$_.Port -eq 3000}
```

### ❌ "Module not found" después de agregar dependencias

**Solución:** Reinicia el servidor de desarrollo:

```bash
# Detén el servidor (Ctrl + C)
# Luego reinicia
npm run dev
```

---

## 9️⃣ Mejores prácticas para principiantes

### ✅ Control de versiones

Usa Git para seguimiento:

```bash
# Inicializa git
git init

# Crea un .gitignore
echo "node_modules/" > .gitignore
echo ".env.local" >> .gitignore
echo ".next/" >> .gitignore

# Haz tu primer commit
git add .
git commit -m "Initial commit: proyecto Next.js LMS"
```

### ✅ Variables de entorno

Nunca hagas commit de `.env.local`:

```bash
# .gitignore debe contener:
.env.local
.env.*.local
```

Usa `.env.example` para documentar qué variables necesitas:

```bash
# .env.example
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
NEXTAUTH_SECRET="generate-with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
NEXTAUTH_URL="http://localhost:3000"
```

### ✅ Estructura del código

Mantén tu código organizado:

- Componentes en `components/`
- Lógica en `services/` o `lib/`
- Tipos en `types/`
- Hooks custom en `hooks/`

### ✅ TypeScript

Aprovecha TypeScript para evitar errores:

```typescript
// ✅ Bueno: tipos explícitos
interface User {
  id: number;
  email: string;
  name?: string;
}

// ❌ Malo: sin tipos
const user = { id: 1, email: "test@test.com" };
```

---

## 🔟 Recursos útiles

- **Documentación Next.js:** https://nextjs.org/docs
- **Documentación Prisma:** https://www.prisma.io/docs/
- **Documentación NextAuth:** https://next-auth.js.org/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs/
- **React Query:** https://tanstack.com/query/latest
- **Zod:** https://zod.dev/

---

## 1️⃣1️⃣ Checklist de inicialización

Antes de empezar a desarrollar, verifica:

- [ ] Node.js y npm están instalados
- [ ] Las dependencias están instaladas (`npm install`)
- [ ] `.env.local` está creado con las variables correctas
- [ ] La base de datos está configurada en `DATABASE_URL`
- [ ] Prisma está inicializado (`prisma/schema.prisma` existe)
- [ ] Las migraciones se han ejecutado (`npx prisma migrate deploy`)
- [ ] El servidor de desarrollo inicia sin errores (`npm run dev`)
- [ ] Puedes acceder a http://localhost:3000

¡Una vez completado todo esto, ¡estás listo para empezar a desarrollar! 🚀

---

## 📝 Notas finales

Este proyecto está construido con:

- **Next.js 16.2.4** - Framework React moderno
- **TypeScript** - Tipado estático en JavaScript
- **Prisma** - ORM para bases de datos
- **PostgreSQL** - Base de datos relacional (configurable)
- **NextAuth** - Autenticación segura
- **Tailwind CSS** - Estilos utilitarios
- **React Query** - Gestión de estado y caché
- **Zod** - Validación de datos

Si tienes preguntas o encuentras problemas, consulta la documentación oficial de cada librería o pide ayuda en comunidades como:

- Stack Overflow
- GitHub Discussions
- Discord communities de Next.js
- Foros de desarrollo web

¡Feliz codificación! 💻
