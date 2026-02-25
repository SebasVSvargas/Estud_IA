# 🧩 Reto 1 — Gestor Dinámico de Lista de Tareas (To-Do List Inteligente)

## 🎯 Objetivo

Construir una aplicación web que permita administrar tareas usando manipulación del DOM sin frameworks.

## 📋 Descripción del Caso

Una startup necesita una herramienta sencilla para que su equipo registre tareas diarias. La aplicación debe permitir:

- Crear tareas
- Marcar tareas como completadas
- Eliminar tareas
- Mostrar cantidad de tareas pendientes

## ⚙️ Requisitos Funcionales

### ✔️ Crear tareas

El usuario debe poder escribir una tarea en un input y agregarla a una lista.

### ✔️ Marcar tareas como completadas

Cuando el usuario haga click sobre una tarea:

- Debe cambiar visualmente (tachado o color diferente)
- Debe poder alternar entre completada y pendiente

### ✔️ Eliminar tareas

Cada tarea debe tener un botón para eliminarla.

### ✔️ Contador dinámico

Debe mostrar:

- Número total de tareas
- Número de tareas completadas
- Número de tareas pendientes

## 🧠 Conceptos que deben aplicar

### Selección de elementos

- Input
- Botón agregar
- Lista de tareas
- Contador

### Manipulación del DOM

- Crear elementos `<li>`
- Agregar botones dentro de cada tarea
- Modificar clases
- Eliminar elementos

### Event Listeners

- Click para agregar tareas
- Click para marcar completadas

### Event Delegation

Los eventos para:

- Marcar tareas
- Eliminar tareas

Deben manejarse desde el contenedor padre de la lista.

## 🚫 Restricciones Técnicas

- No usar frameworks
- No usar inline events en HTML
- Todo el comportamiento debe estar en JavaScript
- Debe usarse `classList`

## ⭐ Retos Extra (Opcional)

- Guardar tareas en LocalStorage
- Permitir editar tareas
- Agregar filtro:
    - Todas
    - Completadas
    - Pendientes