# Estructura del proyecto `next-lms`

Esta guía resume cómo está organizado el proyecto para que puedas volver a ubicarte rápido cuando retomes el código.

## 1. Vista general

```text
next-lms/
├── src/
│   ├── app/                  # Rutas, layouts y endpoints con App Router
│   ├── components/           # Componentes reutilizables compartidos
│   ├── config/               # Configuración de la app
│   ├── hooks/                # Hooks personalizados
│   ├── lib/                  # Utilidades, Prisma y helpers de bajo nivel
│   ├── services/             # Capa de servicios del dominio
│   └── types/                # Tipos compartidos
├── prisma/
│   ├── schema.prisma         # Modelos y relaciones de la base de datos
│   ├── migrations/           # Historial de migraciones SQL
│   └── seed.ts               # Datos iniciales de prueba
├── public/                   # Archivos estáticos
├── envConfig.ts              # Carga variables de entorno con @next/env
├── prisma.config.ts          # Configuración de Prisma 7
├── SETUP_GUIDE.md            # Guía de instalación y arranque
├── package.json              # Scripts y dependencias
└── README.md                 # Punto de entrada de la documentación
```

## 2. Carpeta `src/`

### `src/app/`

Aquí vive la aplicación usando App Router de Next.js.

```text
src/app/
├── layout.tsx                # Layout raíz
├── globals.css               # Estilos globales
├── favicon.ico
├── test-db/                  # Ruta de prueba para validar BD
├── api/                      # Route handlers (backend dentro de Next)
│   ├── auth/
│   └── register/
├── (auth)/                   # Grupo de rutas de autenticación
│   ├── layout.tsx
│   ├── components/
│   ├── signin/
│   └── signup/
├── (dashboard)/              # Grupo de rutas privadas del panel
│   └── dashboard/
└── (marketing)/              # Landing y páginas públicas
    ├── layout.tsx
    └── page.tsx
```

#### Qué significa cada grupo

- `(marketing)`: páginas públicas, por ejemplo la landing principal.
- `(auth)`: flujo de autenticación, formularios y layout de acceso.
- `(dashboard)`: área autenticada del LMS, donde se administran cursos y métricas.
- `api`: endpoints backend dentro del mismo proyecto Next.js.

### `src/app/(dashboard)/dashboard/`

Es la zona más cercana a la administración del LMS.

```text
src/app/(dashboard)/dashboard/
├── layout.tsx
├── page.tsx                  # Dashboard principal
├── courses/
│   └── page.tsx              # Pantalla de cursos
└── components/
    ├── CoursesTable.tsx
    ├── RecentActivity.tsx
    ├── Sidebar.tsx
    ├── StatCard.tsx
    ├── Stats.tsx
    └── Topbar.tsx
```

### `src/components/`

Componentes compartidos fuera de una ruta concreta.

```text
src/components/
├── auth-components.tsx
├── Footer.tsx
├── Navbar.tsx
├── providers/
│   └── session-provider.tsx
└── ui/
    ├── badge.tsx
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    └── separator.tsx
```

#### Idea práctica

- Si el componente solo se usa dentro de una pantalla, suele tener sentido dejarlo cerca de esa ruta.
- Si se reutiliza en varias pantallas, normalmente vive en `src/components/`.

### `src/lib/`

Contiene piezas base del proyecto.

- `prisma.ts`: crea y reutiliza la instancia de Prisma Client.
- `generated/`: cliente generado por Prisma.
- `auth.ts`: lógica relacionada con autenticación.
- `getTenant.ts`: utilidades para resolver el tenant actual.
- `utils.ts`: helpers generales.
- `data/`: datos o helpers auxiliares del dominio.

### `src/config/`

Configuración centralizada de la aplicación.

- `site.ts`: nombre, descripción y enlaces principales del sitio.
- `index.ts`: punto de exportación de configuración.

### `src/services/`

Espacio pensado para la lógica de negocio o acceso a datos por dominio. Aunque hoy está poco poblado, es una buena ubicación para código que no debe quedar mezclado con los componentes o handlers.

### `src/types/`

Tipos compartidos de TypeScript para mantener consistencia entre componentes, servicios y acceso a datos.

## 3. Carpeta `prisma/`

```text
prisma/
├── schema.prisma             # Define tablas, enums, relaciones y constraints
├── migrations/               # SQL versionado de los cambios del esquema
└── seed.ts                   # Carga datos iniciales de ejemplo
```

### Qué hay en `schema.prisma`

El esquema modela una plataforma LMS multi-tenant. Los bloques más importantes son:

- `Tenant`: organización o empresa dueña del espacio.
- `User`: usuarios con roles como `SUPER_ADMIN`, `ADMIN`, `INSTRUCTOR` y `STUDENT`.
- `Account`, `Session`, `VerificationToken`: soporte para autenticación con NextAuth.
- `Course`, `Module`, `Lesson`: estructura académica del LMS.
- `Category` y `CategoriesOnCourses`: categorización de cursos.
- `Enrollment` y `LessonProgress`: inscripción y progreso de estudiantes.

## 4. Archivos clave en la raíz

### `package.json`

Incluye scripts principales:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

### `envConfig.ts`

Carga variables de entorno usando `@next/env`. Esto permite que Prisma y otros módulos lean `.env` o `.env.local` sin depender solo del runtime de Next.

### `prisma.config.ts`

Configura Prisma 7 para este repo:

- Usa `prisma/schema.prisma` como esquema.
- Guarda migraciones en `prisma/migrations`.
- Usa `tsx prisma/seed.ts` como comando de seed.
- Toma `DATABASE_URL` desde variables de entorno.

## 5. Flujo mental para ubicarte rápido

Cuando no recuerdes dónde tocar algo, usa esta lógica:

1. Si cambia una pantalla: empieza en `src/app/`.
2. Si cambia un componente reutilizable: revisa `src/components/`.
3. Si cambia acceso a base de datos: revisa `src/lib/prisma.ts`, `src/services/` o `prisma/schema.prisma`.
4. Si cambia autenticación: revisa `src/app/api/auth/`, `src/lib/auth.ts` y modelos de Prisma como `User`, `Account` y `Session`.
5. Si cambia estructura de datos: revisa `prisma/schema.prisma` y luego crea una migración.

## 6. Resumen corto

- `src/app/` organiza rutas y vistas.
- `src/components/` concentra UI reutilizable.
- `src/lib/` contiene la base técnica, incluida Prisma.
- `prisma/` controla el modelo de datos y la evolución de la base de datos.
- La raíz contiene configuración global, variables de entorno y scripts.

Si necesitas repasar Prisma con más detalle, sigue con [docs/PRISMA_GUIDE.md](./PRISMA_GUIDE.md).