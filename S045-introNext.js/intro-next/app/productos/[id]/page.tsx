
import Link from "next/link";
// import { obtenerProductoPorId } from "../data";
import { obtenerProductoPorId } from "../../services/productsService";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductoDetalle({ params }: Props) {
  const { id } = await params;
  const producto = await obtenerProductoPorId(Number(id));

  // Si el producto no existe, mostrar 404
  if (!producto) {
    notFound();
  }

  return (
    <div>
      {/* Botón volver */}
      <Link
        href="/productos"
        className="inline-block mb-6 text-blue-600 hover:text-blue-800 font-semibold"
      >
        ← Volver a Productos
      </Link>

      {/* Contenedor principal */}
      <div className="bg-white rounded-lg shadow p-8 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Imagen */}
          <div className="bg-gradient-to from-blue-400 to-blue-600 rounded-lg h-96 flex items-center justify-center">
            {/* <span className="text-white text-9xl">📦</span> */}
            <img src={producto.image} alt={producto.title} className="h-full w-full object-cover rounded" />
          </div>

          {/* Información */}
          <div>
            <div className="mb-2 text-sm text-gray-500 uppercase tracking-wide">
              {producto.category}
            </div>

            <h1 className="text-4xl font-bold mb-4">{producto.title}</h1>

            <p className="text-gray-600 text-lg mb-6">{producto.description}</p>

            {/* Precio y stock */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Precio:</span>
                <span className="text-4xl font-bold text-blue-600">
                  ${producto.price}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Stock disponible:</span>
                <span className={`text-2xl font-bold ${
                  Math.random() > 0.5 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {Math.random() > 0.5 ? `Disponible` : 'Agotado'}
                </span>
              </div>
            </div>

            {/* Botón de compra */}
            <button
              className={`w-full py-3 rounded-lg font-bold text-lg transition-colors ${
                Math.random() > 0.5
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={Math.random() > 0.5}
            >
              {Math.random() > 0.5 ? 'Agregar al carrito' : 'Producto agotado'}
            </button>
          </div>
        </div>

        {/* Características adicionales */}
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-4">Especificaciones</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold text-gray-700">Categoría</h3>
              <p className="text-gray-600">{producto.category}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold text-gray-700">ID del producto</h3>
              <p className="text-gray-600">#{producto.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}