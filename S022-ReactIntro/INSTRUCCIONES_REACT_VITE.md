# Guía rápida: React + Vite

## 1) Requisitos previos
- Tener instalado **Node.js** (incluye npm).
- Verificar instalación:

```bash
node -v
npm -v
```

---

## 2) Crear un proyecto React con Vite
Comando recomendado:

```bash
npm create vite@latest
```

Durante el asistente, normalmente eliges:
1. **Project name**: nombre de la carpeta del proyecto.
2. **Package name**: nombre interno del proyecto en `package.json`.
3. **Framework**: `React`.
4. **Variant**: recomendado para empezar `JavaScript + SWC`.

También puedes crear en una sola línea:

```bash
npm create vite@latest mi-app -- --template react-swc
```

---

## 3) ¿Qué es `npm init` y cuándo usarlo?
`npm init` crea un proyecto Node.js básico generando un archivo `package.json`.

Comandos comunes:

```bash
npm init
```
Te hace preguntas (name, version, description, entry point, test command, etc.).

```bash
npm init -y
```
Crea `package.json` automáticamente con valores por defecto.

¿Cuándo usar `npm init`?
- Cuando quieres empezar un proyecto desde cero de forma manual.
- Cuando no usarás un template (por ejemplo scripts simples de Node).

Para React con Vite, normalmente no comienzas con `npm init`, sino con:

```bash
npm create vite@latest
```

---

## 4) Entrar al proyecto e instalar dependencias
```bash
cd mi-app
npm install
```

### ¿Qué hace `npm install`?
`npm install` (o `npm i`) hace principalmente esto:
- Lee el archivo `package.json`.
- Descarga e instala todas las dependencias y devDependencies.
- Crea la carpeta `node_modules/`.
- Genera o actualiza `package-lock.json` (bloquea versiones exactas para reproducibilidad).

Sin ejecutar `npm install`, el proyecto casi nunca podrá correr porque faltan paquetes.

---

## 5) Comandos más usados en React + Vite
En la carpeta del proyecto:

```bash
npm run dev
```
Inicia servidor de desarrollo (hot reload).

```bash
npm run build
```
Genera versión de producción en `dist/`.

```bash
npm run preview
```
Sirve localmente la build de producción para probarla.

```bash
npm run lint
```
Ejecuta revisión de estilo/errores con ESLint (si está configurado).

---

## 6) Instalar paquetes adicionales
Instalar dependencia normal:

```bash
npm install nombre-paquete
```

Instalar dependencia de desarrollo:

```bash
npm install -D nombre-paquete
```

Ejemplos:

```bash
npm install axios
npm install -D vitest
```

---

## 7) Flujo recomendado (resumen)
1. Crear proyecto con Vite.
2. Entrar a la carpeta.
3. Ejecutar `npm install`.
4. Ejecutar `npm run dev`.
5. Programar en `src/`.
6. Antes de publicar, ejecutar `npm run build`.

---

## 8) Errores comunes
- **`npm: command not found`**: Node.js/npm no está instalado o no está en PATH.
- **`Missing script: dev`**: no estás en la carpeta correcta o falta `scripts` en `package.json`.
- **No encuentra paquetes**: faltó ejecutar `npm install`.

---

## 9) Nota útil
- `npm install` instala paquetes.
- `npm run <script>` ejecuta scripts definidos en `package.json` (por ejemplo `dev`, `build`, `preview`).
