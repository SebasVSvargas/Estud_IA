export function capitalizarNombre(nombre){

    if (typeof nombre !== "string") {
        throw new Error("El nombre debe ser una cadena de texto");
    }
    return nombre.split(" ")
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
        .join(" ");
}   

export function convertirAMayusculas(texto) {
    if (typeof texto !== "string") {
        throw new Error("El texto debe ser una cadena de texto");
    }
    return texto.toUpperCase();
}