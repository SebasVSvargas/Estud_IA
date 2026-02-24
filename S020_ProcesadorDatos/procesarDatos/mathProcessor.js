
// Función que simula cálculo pesado
export const procesarMedicion = async (valor, multiplicador = 2) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const resultado = valor * multiplicador + 5;
      resolve(resultado);
    }, 2000); // simula 2 segundos
  });
};

// Procesar múltiples mediciones usando rest parameters
export const procesarLote = async (...mediciones) => {
  let resultados = [];

  for (let medicion of mediciones) {
    if (medicion.activo) {
      const resultado = await procesarMedicion(medicion.valor);
      resultados.push({ ...medicion, resultado });
    }
  }

  return resultados;
};