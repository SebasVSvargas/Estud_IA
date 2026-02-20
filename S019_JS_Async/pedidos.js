
// ─── Datos de respaldo ───────────────────────────────────────────────────────

const productosFallback = [
    { id: 1, nombre: "CocaCola", precio: 10 },
    { id: 2, nombre: "Leche",    precio: 20 },
    { id: 3, nombre: "Jamon",    precio: 30 },
    { id: 4, nombre: "Pan",      precio: 40 },
    { id: 5, nombre: "Queso",    precio: 50 },
];

const pedidoFallback = {
    productos: productosFallback,
    metodoPago: "tarjeta",
};

// ─── Helpers de consola ───────────────────────────────────────────────────────

function logSeccion(titulo) {
    console.log(`\n${"─".repeat(40)}`);
    console.log(`  ${titulo}`);
    console.log("─".repeat(40));
}

function logPaso(emoji, mensaje) {
console.log(`${emoji}  ${mensaje}`);
}

// ─── Promesas simuladas ───────────────────────────────────────────────────────

function validarPedido(pedido) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Array.isArray(pedido?.productos) && pedido.productos.length > 0) {
                resolve(`Pedido válido con ${pedido.productos.length} producto(s)`);
            } else {
                reject("El pedido no tiene productos");
            }
        }, 1000);
    });
}

function procesarPago(pedido) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const metodos = {
                tarjeta: "Pago con tarjeta aprobado",
                nequi:   "Pago con Nequi aprobado",
                efectivo:"Pago en efectivo aceptado",
            };
            const resultado = metodos[pedido?.metodoPago];
            if (resultado) {
                resolve(resultado);
            } else {
                reject(`Método de pago inválido: "${pedido?.metodoPago}"`);
            }
        }, 2000);
    });
}

function prepararEnvio(pedido) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const nombres = pedido.productos
                .map(p => p.title || p.nombre)
                .join(", ");
            resolve(`Envío preparado para: ${nombres}`);
        }, 1500);
    });
}

// ─── Flujo principal del pedido ───────────────────────────────────────────────

async function realizarPedido(pedido) {
    logSeccion("PROCESANDO PEDIDO");

    try {
        logPaso("🔍", "Validando pedido...");
        const validacion = await validarPedido(pedido);
        logPaso("✅", validacion);

        logPaso("💳", "Procesando pago...");
        const pago = await procesarPago(pedido);
        logPaso("✅", pago);

        logPaso("📦", "Preparando envío...");
        const envio = await prepararEnvio(pedido);
        logPaso("✅", envio);

        logSeccion("PEDIDO COMPLETADO");
    } catch (error) {
        logPaso("❌", `Error: ${error}`);
    }
}

// ─── Consumo de API ───────────────────────────────────────────────────────────

async function obtenerProductoApi(id) {
    logPaso("🌐", `Consultando API para producto id=${id}...`);

    const respuesta = await fetch(`https://dummyjson.com/products/${id}`);

    if (!respuesta.ok) {
        throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
    }

    const producto = await respuesta.json();

    if (producto.message || !producto.id) {
        throw new Error(`Producto no encontrado (id=${id})`);
    }

    return producto;
}

function mostrarInfoProducto(producto) {
    logPaso("🏷️ ", `Nombre   : ${producto.title}`);
    logPaso("💰", `Precio   : $${producto.price}`);
    logPaso("⭐", `Rating   : ${producto.rating}`);
    logPaso("📦", `Stock    : ${producto.stock} unidades`);
    logPaso("🚚", `Envío    : ${producto.shippingInformation}`);
}

async function crearPedido(id, metodoPago = "tarjeta") {
    logSeccion("CREANDO PEDIDO");

    try {
        const producto = await obtenerProductoApi(id);
        logPaso("✅", "Producto encontrado:");
        mostrarInfoProducto(producto);

        return {
            productos: [producto],
            metodoPago,
        };
    } catch (error) {
        logPaso("⚠️ ", `${error.message}`);
        logPaso("🔄", "Usando pedido de respaldo...");
        return pedidoFallback;
    }
}

// ─── Inicio ───────────────────────────────────────────────────────────────────

(async () => {
    const pedido = await crearPedido(2, "tarjeta");
    const pedido2 = await crearPedido(10, "nequi");
    await realizarPedido(pedido);
    await realizarPedido(pedido2);
})();
