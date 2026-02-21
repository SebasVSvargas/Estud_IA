
export default function calcularTotalConImpuesto(precio, impuesto = 0.19) {

    if (typeof precio !== "number" || typeof impuesto !== "number") {
        throw new Error("El precio y el impuesto deben ser números");}
    if (precio < 0 || impuesto < 0) {
        throw new Error("El precio y el impuesto no pueden ser negativos");}

    const total = precio * (1 + impuesto);
    return parseFloat(total.toFixed(2));
}

