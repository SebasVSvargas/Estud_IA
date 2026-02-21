const carrito = [
  { id: 101, producto: "Laptop", precio: 3500, cantidad: 1, disponible: true },
  { id: 102, producto: "Mouse", precio: 120, cantidad: 2, disponible: true },
  { id: 103, producto: "Monitor", precio: 900, cantidad: 1, disponible: false },
  { id: 104, producto: "Teclado", precio: 250, cantidad: 1, disponible: true }
];

const productos_disponibles = carrito.filter(p => p.disponible)
console.log("Productos disponibles:", productos_disponibles)

const producto_con_subtotal = carrito.map(p => ({ ...p, subtotal: p.precio * p.cantidad }))
console.log("Productos con subtotal:", producto_con_subtotal)

const total_carrito = carrito.reduce((acum, p) => acum + p.precio*p.cantidad, 0)
console.log("Total del carrito: ", total_carrito);

const some_mayor_1 = carrito.some(p => p.cantidad > 1)
console.log("Hay productos con una cantidad mayor a 1? Rta:", some_mayor_1);

let Resumen = {
    totalProductos: carrito.reduce((acum, p) => acum + p.cantidad, 0),
    totalCompra: carrito.reduce((acum, p) => acum + p.precio* p.cantidad, 0),
    productosDisponibles: productos_disponibles.length
}
console.log("Resumen:", Resumen);

