export function generarReporte(resultados = []) {

  let suma = 0;

  for (let item of resultados) {
    suma += item.resultado;
  }

  const promedio = resultados.length > 0 ? suma / resultados.length : 0;

  return {
    totalProcesados: resultados.length,
    suma,
    promedio
  };
}