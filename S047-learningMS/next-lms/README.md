# Next LMS

Proyecto de aprendizaje en línea construido con Next.js, App Router, NextAuth y Prisma sobre PostgreSQL.

## Documentación principal

- [Guía de estructura del proyecto](./docs/PROJECT_STRUCTURE.md)
- [Guía de Prisma](./docs/PRISMA_GUIDE.md)
- [Guía de instalación inicial](./SETUP_GUIDE.md)

## Arranque rápido

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Abre `http://localhost:3000` en el navegador.

## Stack principal

- Next.js 16
- React 19
- Prisma 7
- PostgreSQL
- NextAuth
- Tailwind CSS

## Variables importantes

Revisa `.env.example` para ver las variables base del proyecto. La más importante para Prisma es:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/nextlms_dev?schema=public"
```

## Nota de estudio

Si tu objetivo es poder reconstruir el proyecto desde cero o recordar el flujo de Prisma, empieza por la guía de Prisma y luego revisa la estructura del proyecto.
