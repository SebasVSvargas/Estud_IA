//Pattern IIFE (Immediately Invoked Function Expression)
//Es una función que se ejecuta inmediatamente después de ser definida, 
// y se utiliza para crear un ámbito local y evitar la contaminación del espacio global.

import {productos as items} from "./products.js";

const cart = (function() {
    
    let productos = items.filter(item => item.id <= 3);

    function agregarProductoExistente(id) {
        const producto = items.find(p => p.id === id);
        if (!producto) {
            throw new Error(`Producto con id ${id} no encontrado`);
        }else {
        productos = [...productos, producto];
        }
    }

    // function agregarNuevoProducto(item) {
    //     const id = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
    //     item.id = id;
    //     // productos.push(item);
    //     productos = [...productos, item];
    // }

    function eliminarProducto(id) {        
        productos = productos.filter(item => item.id !== id);
    }
    
    function obtenerSubtotal() {
        return productos.reduce((total, item) => total + item.precio, 0)
    }

    function listarProductos() {
        return productos.map(p => `Id: ${p.id}, ${p.nombre}: $${p.precio.toFixed(0)}`).join("\n");
    }

    return {
        agregarProductoExistente,
        // agregarNuevoProducto,
        eliminarProducto,
        obtenerSubtotal,
        listarProductos
    };
})();

export default cart;
