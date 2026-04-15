
interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductoDetalle({ params }: Props) {

    const { id } = await params;

    return (
        <div>
            <h1>Detalle del Producto {id}</h1>
            <p>Información sobre el producto con ID: {id}.</p>
        </div>
    );
    
}