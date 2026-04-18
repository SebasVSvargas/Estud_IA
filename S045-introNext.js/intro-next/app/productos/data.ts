// Datos de ejemplo
export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  stock: number;
  imagen?: string;
}

export const productos: Producto[] = [
  {
    id: 1,
    nombre: "Laptop Dell XPS 13",
    descripcion: "Laptop ultraligera con pantalla 4K y procesador Intel i7",
    precio: 1299.99,
    categoria: "Electrónica",
    stock: 5,
  },
  {
    id: 2,
    nombre: "Mouse Logitech MX Master",
    descripcion: "Mouse inalámbrico profesional con precisión avanzada",
    precio: 99.99,
    categoria: "Accesorios",
    stock: 15,
  },
  {
    id: 3,
    nombre: "Teclado Mecánico RGB",
    descripcion: "Teclado mecánico gaming con iluminación RGB personalizable",
    precio: 149.99,
    categoria: "Gaming",
    stock: 8,
  },
  {
    id: 4,
    nombre: "Monitor LG 4K 32\"",
    descripcion: "Monitor 4K 32 pulgadas con panel IPS y colores vibrantes",
    precio: 599.99,
    categoria: "Electrónica",
    stock: 3,
  },
  {
    id: 5,
    nombre: "Headphones Sony WH-1000XM5",
    descripcion: "Audífonos con cancelación de ruido de clase mundial",
    precio: 399.99,
    categoria: "Audio",
    stock: 7,
  },
];

// Función para obtener un producto por ID
export function obtenerProductoPorId(id: number): Producto | undefined {
  return productos.find((p) => p.id === id);
}
