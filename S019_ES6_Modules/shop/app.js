import carrito from "./cart.js";
import calcularTotalConImpuesto from "./tax.js";

//agregar producto existente
carrito.agregarProductoExistente(4);
carrito.agregarProductoExistente(7);

// Agregar nuevos productos al carrito
// carrito.agregarNuevoProducto({ id: 1, nombre: "Camiseta", precio: 20_000 });
// carrito.agregarNuevoProducto({ id: 2, nombre: "Pantalón", precio: 50_000 });
// carrito.agregarNuevoProducto({ id: 3, nombre: "Zapatos", precio: 100_000 });

//Eliminar un producto del carrito
carrito.eliminarProducto(2);

//Calcular el total
const subtotal = carrito.obtenerSubtotal();
const totalConImpuesto = calcularTotalConImpuesto(subtotal);

console.log("Productos en el carrito:");
console.log(carrito.listarProductos());
console.log(`Subtotal: $${subtotal.toFixed(0)}`);
console.log(`Total con impuesto: $${totalConImpuesto.toFixed(0)}`);