export default async function analizarResultados(resultados) {

    const totalRutas = resultados.length;
    const costoPromedio = totalRutas > 0 ? resultados.reduce((acc, ruta) => acc + ruta.costoTotal, 0) / totalRutas : 0;
    const rutaMasEconomica = resultados.reduce((minRuta,ruta) => ruta.costoTotal < minRuta.costoTotal ? ruta : minRuta, resultados[0]);
    const rutaMasCostosa = resultados.reduce((maxRuta,ruta) => ruta.costoTotal > maxRuta.costoTotal ? ruta : maxRuta, resultados[0]);

    return {
        totalRutas,
        costoPromedio,
        rutaMasEconomica,
        rutaMasCostosa
    };

}