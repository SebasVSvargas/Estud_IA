import { mediciones } from "./data.js";
import { procesarLote } from "./mathProcessor.js";
import { generarReporte } from "./report.js";

async function iniciarSimulacion() {

  console.log("Iniciando procesamiento...\n");

  const resultados = await procesarLote(...mediciones);

  const reporte = generarReporte(resultados);

  console.log("=== RESULTADOS ===");
  console.log(resultados);

  console.log(`
Resumen:
Total procesados: ${reporte.totalProcesados}
Suma total: ${reporte.suma}
Promedio: ${reporte.promedio}
`);
}

iniciarSimulacion();