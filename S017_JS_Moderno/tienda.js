function crearPedido(nombre = "Cliente Invitado", ...productos) {    
    const result = {
        cliente: nombre,
        Cantidad: productos.length,
        total: productos.reduce((acum, p) => acum + (p?.precio ?? 0), 0)
    };

    const mensaje = `Pedido para: ${result.cliente}
Cantidad de productos: ${result.Cantidad}
Total a pagar: ${result.total}`;

    return {
        Nombre: nombre,
        productos,
        total: result.total,
        resumen : mensaje
    };
}

const productos = [
    { nombre: "Nevera", precio: 1500000 },
    { nombre: "Lavadora", precio: 1200000 },
    { nombre: "Televisor", precio: 800000 },
    { nombre: "Microondas", precio: 400000 },
    { nombre: "Horno", precio: 600000 }
];

const p1 = { nombre: "Laptop", precio: 2000 };
const p2 = { nombre: "Mouse", precio: 50 };
const p3 = { nombre: "Teclado" };

console.log(crearPedido("Miguel", p1, p2, p3));
console.log(crearPedido("Sebastian", ...productos));
console.log(crearPedido(undefined,...productos));
console.log(crearPedido(null,...productos));