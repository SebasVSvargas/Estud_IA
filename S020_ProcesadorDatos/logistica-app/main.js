
import { rutas } from './routes.js';
import { procesarRutas } from './optimizer.js';
import analizador from './analytics.js';

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function ReporteRutas(...rutas){

    console.log("===== Inicio calculo de Rutas ======");
    await esperar(2000); 
    const copiaRutas = [...rutas];

    console.log("===== Procesamiento Datos ======");
    const procesados = await procesarRutas(...copiaRutas);

    console.log("===== Cargando Resultados ======");
    await esperar(2000);

    const analisis = await analizador(procesados);

    const object = {
        totalRutas: analisis.totalRutas,
        costoPromedio: analisis.costoPromedio,
        rutaMasEconomica: analisis.rutaMasEconomica,
        rutaMasCostosa: analisis.rutaMasCostosa
    };    

    // console.log(`Resultados: \n${JSON.stringify(object, null, 2)}`);

    console.log(`Total Rutas: ${analisis.totalRutas}`);
    console.log(`Costo Promedio: ${analisis.costoPromedio.toFixed(2)}`);
    console.log(`Ruta Más Económica: ${analisis.rutaMasEconomica.id}`);
    console.log(`Ruta Más Costosa: ${analisis.rutaMasCostosa.id}`);

}

ReporteRutas(...rutas);