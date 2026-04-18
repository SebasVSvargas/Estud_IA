
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image?: string;
}

export async function obtenerProductos(): Promise<Product[]> {
    try {
        const response = await fetch('https://fakestoreapi.com/products',{
            next: {revalidate: 3600} // cada hora
        });

        if (!response.ok) {
            throw new Error(`Error al obtener productos: ${response.statusText}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
        return [];
    }
}


export async function obtenerProductoPorId(id: number): Promise<Product | null> {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        next: { revalidate: 3600 } // cachea 1 hora
        });

        if (!response.ok) {
            if (response.status === 404) {
                return null; // Producto no existe
            }
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
        
    } catch (error) {
        console.error(`Error obteniendo producto ${id}:`, error);
        return null;
    }
}
