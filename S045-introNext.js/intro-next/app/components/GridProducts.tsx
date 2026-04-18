
import Link from "next/link";
// import { productos } from "../productos/data";
import { obtenerProductos } from "../services/productsService";
import Image from "next/image";

export default async function ProductsForm(){

    var products = await obtenerProductos();

    if (products.length === 0) {
        return (
            <div>
                <h1 className="text-red-500 text-4xl font-bold mb-8">Error al cargar productos</h1>
                <p className="text-gray-700">No se pudieron obtener los productos en este momento. Por favor, inténtalo de nuevo más tarde.</p>
            </div>
        );
    }

    return (            
    <div>
        <h1 className="text-orange-500 text-4xl font-bold mb-8">Nuestros Productos</h1>
        <p className="text-green-700 mb-6">Tenemos {products.length} productos disponibles</p>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
            <Link key={product.id} href={`/productos/${product.id}`}>
            <div className="bg-blue-100 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer h-full p-4">
                
                {/* Imagen placeholder */}
                <div className="bg-linear-to-br from-blue-400 to-blue-600 rounded h-40 mb-4 flex items-center justify-center">
                {/* <span className="text-white text-3xl">📦</span> */}
                    {/* <img 
                        src={product.image} 
                        alt={product.title} 
                        className="h-full w-full object-cover rounded" /> */}

                    <Image src={product.image} alt={product.title} width={100} height={100} 
                        className="h-full object-cover rounded"/>

                </div>

                {/* Contenido */}
                <h2 className="text-blue-600 text-lg font-bold mb-2">{product.title}</h2>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
                </p>

                {/* Footer del card */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <span className="text-2xl font-bold text-blue-600">
                        ${product.price}
                    </span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        Stock: {Math.random() > 0.5 ? 'Disponible' : 'Agotado'}
                    </span>
                </div>
            </div>
            </Link>
        ))}
        </div>
    </div>
    );

}