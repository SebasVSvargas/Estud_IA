const estudiantes = [
  { id: 1, nombre: "Laura", nota: 4.5, activo: true },
  { id: 2, nombre: "Carlos", nota: 2.8, activo: false },
  { id: 3, nombre: "Sofía", nota: 3.9, activo: true },
  { id: 4, nombre: "Mateo", nota: 4.8, activo: true },
  { id: 5, nombre: "Valentina", nota: 2.5, activo: false }
];

console.log("SOLUCIÓN");

const estudiantes_activos = estudiantes.filter(e => e.activo)
console.log("Estudiantes Activos: \n",estudiantes_activos)

let nombres_activos = estudiantes_activos.map(e => e.nombre)
console.log("Nombres estudiantes activos: ", nombres_activos);

let promedio_activos = estudiantes_activos.reduce((acum, e) => acum + e.nota, 0)/estudiantes_activos.length
console.log("Promedio Activos: ",promedio_activos);

let todos_activos_aprobaron = estudiantes_activos.every(e => e.nota >= 3.0)
console.log("Activos aprobaron? R//: ",todos_activos_aprobaron);

let estudiante4_7 = estudiantes.find(e => e.nota > 4.7).nombre
console.log("Primer estudiante con nota superior a 4.7:",estudiante4_7);


// Añadir nueva propiedad al array de estudiantes
const estudiantes_plus = estudiantes.map(e => {
    if(e.nota >= 3.0)
        return { ...e, estado: "Aprobado" }
    else
        return { ...e, estado: "Reprobado" }
})

console.log("Resultados:", estudiantes_plus);


//Intentando otra forma de añadir nueva propiedad llamando la función
function Resultado(estudiante){
    if(estudiante.nota >= 3.0)
        return { ...estudiante, estado: "Aprobado" }
    else
        return { ...estudiante, estado: "Reprobado" }
}
const estudiantes_plus2 = estudiantes.map(Resultado)
console.log("Resultados2:", estudiantes_plus2);