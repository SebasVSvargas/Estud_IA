

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ServicioDetalle({ params }: Props) {

    const { id } = await params;

    return (
        <div>
            <h1>Detalle del Servicio {id}</h1>
            <p>Información sobre el servicio con ID: {id}.</p>
        </div>
    );
    
}