# AmortizationApp-React

Estructura modular del simulador de crédito para facilitar mantenimiento y evolución.

## Estructura

- `New Text Document.jsx`: punto de entrada (compatibilidad), reexporta `src/App.jsx`.
- `src/App.jsx`: orquesta estado global, handlers y renderizado por pestañas.
- `src/hooks/useLoanCalculations.js`: cálculos financieros (base, optimizado y estrategia).
- `src/utils/formatters.js`: utilidades de formateo.
- `src/components/`: componentes de UI por dominio (`panels`, `tabs`).

## Flujo recomendado

1. Cambios de lógica financiera: `src/hooks/useLoanCalculations.js`
2. Cambios de visualización: `src/components/tabs/*`
3. Cambios de formularios de entrada: `src/components/panels/*`
4. Cambios de estado compartido: `src/App.jsx`

## ¿`npm create vite@latest` también funciona?

Sí, funciona y para principiantes suele ser la mejor opción.

### ¿Cuándo conviene `npm create vite@latest`?

- Cuando inicias un proyecto desde cero.
- Cuando quieres una base lista sin configurar archivos manualmente.
- Cuando prefieres evitar errores de configuración inicial.

### ¿Cuándo conviene armar `package.json` manualmente?

- Cuando ya tienes código en una carpeta existente (como este caso).
- Cuando quieres migrar sin sobrescribir archivos.
- Cuando necesitas controlar exactamente versiones y dependencias.

## Estado actual de este proyecto

Este proyecto ya quedó preparado para Vite con React y Tailwind en la misma carpeta.

Archivos clave:

- `package.json`
- `index.html`
- `vite.config.js`
- `postcss.config.js`
- `tailwind.config.js`
- `src/main.jsx`
- `src/App.jsx`
- `src/index.css`

## Cómo ejecutarlo (paso a paso)

Desde la carpeta `AmortizationApp-React`:

```bash
npm install
npm run dev
```

Luego abre en navegador la URL que te muestre Vite (normalmente `http://localhost:5173`).

## Comandos útiles

```bash
# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Probar build de producción localmente
npm run preview
```

## Ruta recomendada para principiante (proyecto nuevo)

Si fueras a crear otro proyecto nuevo desde cero, usa:

```bash
npm create vite@latest mi-app -- --template react
cd mi-app
npm install
npm run dev
```

## Nota importante sobre carpetas no vacías

`npm create vite@latest` puede preguntar si quieres sobrescribir archivos cuando la carpeta no está vacía.
En un proyecto existente, es más seguro:

1. crear el proyecto Vite en una carpeta nueva,
2. verificar que funciona,
3. copiar tu carpeta `src` y ajustar imports.
