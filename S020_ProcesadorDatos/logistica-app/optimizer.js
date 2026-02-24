
export async function calcularCostoRuta(distancia,costoPorKm,nivelTrafico,penalizacion = 1){

    return new Promise((resolve) => {    
        setTimeout(() => {
            const costoBase = distancia * costoPorKm;
            switch (nivelTrafico) {
                case 'alto':
                    penalizacion = 1.7;
                    break;            
                case 'medio':
                    penalizacion = 1.4;
                    break;
                default:
                    break;
            }
            const costoTotal = costoBase * penalizacion;
            resolve(costoTotal);
        }, aleatorio(1000, 3000));        
    });
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export async function procesarRutas(...rutas){

        const resultados = [];
    for (const ruta of rutas) {
        if (!ruta.activa) continue;
        const rutaCalculada = await calcularCostoRuta(
            ruta.distancia,
            ruta.costoPorKm,
            ruta.trafico
        );
        resultados.push({ ...ruta, costoTotal: rutaCalculada });
    }
    return resultados;
}