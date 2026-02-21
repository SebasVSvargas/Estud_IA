
export function calcularPromedio(grades) {
    if (!Array.isArray(grades) || grades.length === 0) {
        throw new Error("El parámetro debe ser un array")
    }
    const suma = grades.reduce((acc, grade) => acc + grade, 0)
    return suma / grades.length
}

export function estudianteAprobado(grades) {
    const promedio = calcularPromedio(grades)
    return promedio >= 3.0
}