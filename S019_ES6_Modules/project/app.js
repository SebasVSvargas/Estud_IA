
import { capitalizarNombre, convertirAMayusculas } from "./utils.js";
import { calcularPromedio, estudianteAprobado } from "./grades.js";
import crearEstudiante from "./student.js";

const estudiante1 = crearEstudiante("maria martinez gutierrez", [5, 5, 4.8]);
const estudiante2 = crearEstudiante("sebastian vargas suarez", [5, 4.5, 4.2]);
const estudiante3 = crearEstudiante("ana lopez valencia", [2.5, 3.0, 2.8]);
const estudiante4 = crearEstudiante("carlos garcia estrada", [4.5, 3.8, 5.0]);

console.log(estudiante1);
console.log(estudiante2);
console.log(estudiante3);
console.log(estudiante4);

