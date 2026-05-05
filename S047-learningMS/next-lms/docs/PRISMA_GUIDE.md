# Guía de Prisma en `next-lms`

Esta guía está pensada para repasar qué hace Prisma en este proyecto, cómo se configura y cuáles comandos necesitas recordar para trabajar con seguridad.

## 1. Qué es Prisma y para qué sirve

Prisma es una herramienta para trabajar con bases de datos desde TypeScript o JavaScript.

En este proyecto se usa para:

- Definir el esquema de la base de datos en `prisma/schema.prisma`.
- Generar un cliente TypeScript para consultar y modificar datos.
- Versionar cambios de la base de datos con migraciones.
- Poblar la base con datos de ejemplo usando seed.

En pocas palabras: Prisma conecta tu código con PostgreSQL de una forma tipada y más segura.

## 2. Cómo está configurado en este proyecto

### Archivos importantes

- `prisma/schema.prisma`: define modelos, enums y relaciones.
- `prisma.config.ts`: configuración de Prisma 7.
- `prisma/seed.ts`: carga datos iniciales.
- `src/lib/prisma.ts`: crea la instancia reutilizable de Prisma Client.
- `envConfig.ts`: carga variables de entorno.

### Configuración real del repo

Este proyecto usa Prisma 7 y genera el cliente en una carpeta interna del proyecto:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/lib/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

Eso significa dos cosas importantes:

1. El cliente generado queda en `src/lib/generated/prisma`.
2. La conexión no se escribe en el `schema.prisma`, sino que Prisma la toma desde `prisma.config.ts` usando `process.env.DATABASE_URL`.

## 3. Relación entre Prisma y PostgreSQL

La aplicación se conecta a PostgreSQL con la variable `DATABASE_URL`.

Ejemplo tomado de `.env.example`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/nextlms_dev?schema=public"
```

Cuando Prisma corre comandos como migraciones, generación del cliente o seed, usa esa URL para saber a qué base de datos conectarse.

## 4. Qué son las migraciones

Una migración es un cambio versionado de la base de datos.

Ejemplo mental:

- Hoy el modelo `Course` no tiene una columna nueva.
- Modificas `schema.prisma` para agregarla.
- Prisma genera una migración SQL.
- Esa migración queda guardada en `prisma/migrations/`.
- Luego puedes aplicarla en otros entornos para reproducir exactamente el mismo cambio.

### Por qué son importantes

- Dejan historial de cambios.
- Evitan modificar la base a mano sin control.
- Permiten que otros desarrolladores repliquen la estructura.
- Hacen más fácil pasar de desarrollo a producción.

## 5. Diferencia entre `generate`, `migrate`, `db push` y `seed`

### `prisma generate`

Genera el cliente de Prisma a partir del esquema actual.

Úsalo cuando:

- Cambiaste `schema.prisma`.
- Instalaste dependencias por primera vez.
- Clonaste el proyecto y todavía no existe el cliente generado.

Comando:

```bash
npx prisma generate
```

### `prisma migrate dev`

Se usa en desarrollo para crear y aplicar una migración nueva.

Comando típico:

```bash
npx prisma migrate dev --name nombre-del-cambio
```

Qué hace:

- Compara el esquema actual con la base.
- Genera una nueva migración SQL.
- La aplica en tu base local.
- Regenera el cliente.

### `prisma migrate deploy`

Aplica migraciones existentes sin crear nuevas. Se usa más en entornos como staging o producción.

```bash
npx prisma migrate deploy
```

### `prisma db push`

Empuja el esquema a la base sin crear historial de migraciones.

```bash
npx prisma db push
```

Cuándo usarlo:

- Prototipos rápidos.
- Pruebas locales.

Cuándo evitarlo:

- Cuando quieras mantener historial serio del esquema.
- Cuando el equipo dependa de migraciones reproducibles.

### `prisma db seed`

Carga datos iniciales o de prueba.

```bash
npx prisma db seed
```

En este proyecto ejecuta:

```bash
tsx prisma/seed.ts
```

## 6. Comandos Prisma más útiles para repasar

### Inicialización y generación

```bash
npx prisma generate
npx prisma validate
npx prisma format
```

- `generate`: regenera el cliente.
- `validate`: revisa si el schema tiene errores.
- `format`: ordena y da formato al schema.

### Migraciones

```bash
npx prisma migrate dev --name init
npx prisma migrate deploy
npx prisma migrate status
npx prisma migrate reset
```

- `migrate dev`: crea y aplica una migración nueva en desarrollo.
- `migrate deploy`: aplica migraciones pendientes ya creadas.
- `migrate status`: muestra el estado de las migraciones.
- `migrate reset`: borra la base, reaplica migraciones y puede correr seed.

`migrate reset` es destructivo. Úsalo solo cuando sepas que puedes perder los datos de esa base.

### Base de datos y exploración

```bash
npx prisma studio
npx prisma db seed
npx prisma db push
```

- `studio`: abre una interfaz visual para revisar tablas y registros.
- `db seed`: ejecuta el seed configurado.
- `db push`: sincroniza esquema sin migración.

## 7. Flujo recomendado cuando cambias el esquema

Cuando agregues o cambies modelos, sigue este orden:

1. Edita `prisma/schema.prisma`.
2. Valida el archivo.
3. Crea la migración.
4. Revisa que el cliente se regenere.
5. Si hace falta, ajusta el seed.
6. Prueba la aplicación.

Comandos:

```bash
npx prisma validate
npx prisma migrate dev --name descripcion-del-cambio
npx prisma db seed
```

## 8. Cómo funciona el seed en este proyecto

El archivo `prisma/seed.ts` hace una carga completa de datos de ejemplo.

Qué crea:

- categorías
- tenants
- usuarios con varios roles
- cursos
- módulos
- lecciones
- relaciones de inscripción y progreso

También limpia datos previos en un orden controlado para evitar problemas por claves foráneas.

Eso hace que el seed sea útil para desarrollo y pruebas, pero no conviene correrlo sobre una base con datos reales sin revisar primero qué elimina.

## 9. Qué modelos debes recordar primero

Si estás estudiando este repo, empieza por estos modelos:

- `Tenant`: organiza el LMS por empresas u organizaciones.
- `User`: usuarios y roles.
- `Course`: curso principal.
- `Module`: agrupación de lecciones dentro del curso.
- `Lesson`: contenido concreto.
- `Enrollment`: relación estudiante-curso.
- `LessonProgress`: seguimiento del avance.

Con esos siete modelos ya entiendes la mayor parte del dominio.

## 10. Errores comunes al trabajar con Prisma

### Cambié el schema y no veo los cambios en TypeScript

Probablemente falta regenerar el cliente.

```bash
npx prisma generate
```

### Cambié el schema pero la base sigue igual

Probablemente modificaste el archivo, pero no aplicaste una migración.

```bash
npx prisma migrate dev --name describe-tu-cambio
```

### El seed falla por relaciones o claves foráneas

Revisa el orden de borrado o creación en `prisma/seed.ts`, porque este proyecto tiene varias relaciones encadenadas.

### No conecta a la base de datos

Revisa:

- que `DATABASE_URL` exista
- que apunte al motor correcto (`postgresql://`)
- que el servidor de PostgreSQL esté activo
- que el usuario, contraseña, puerto y nombre de base sean correctos

## 11. Secuencia mínima para reconstruir tu flujo

Si mañana tuvieras que repetir el proceso desde cero, esta es la versión corta:

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Si además vas a cambiar el esquema:

```bash
npx prisma migrate dev --name mi-cambio
```

## 12. Resumen rápido para memorizar

- `schema.prisma`: diseña la base.
- `generate`: regenera el cliente.
- `migrate dev`: crea y aplica cambios versionados en desarrollo.
- `migrate deploy`: aplica migraciones ya existentes.
- `db seed`: llena la base con datos de ejemplo.
- `studio`: inspecciona la base visualmente.
- `src/lib/prisma.ts`: punto de acceso al cliente desde la app.

Si quieres ubicar Prisma dentro de todo el repo, revisa también [docs/PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).