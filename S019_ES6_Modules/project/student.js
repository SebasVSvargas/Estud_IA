
import { capitalizarNombre} from "./utils.js";
import { calcularPromedio, estudianteAprobado } from "./grades.js";

export default function crearEstudiante(nombre, grades) {

    //formatear nombre
    const nombreFormateado = capitalizarNombre(nombre)

    //promedio
    const promedio = calcularPromedio(grades)

    //estado
    const aprobado = estudianteAprobado(grades)

    return {
        nombre: nombreFormateado,
        "promedio": promedio,
        "aprobado": aprobado ? "Sí" : "No"
    }
}