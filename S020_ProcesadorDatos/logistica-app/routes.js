
class trafico{
    static BAJO = "bajo";
    static MEDIO = "medio";
    static ALTO = "alto";
}

const routes =[
    {id:1, distancia: 10, trafico: trafico.BAJO , costoPorKm: 5, activa : true},
    {id:2, distancia: 20, trafico: trafico.MEDIO , costoPorKm: 4, activa : true},
    {id:3, distancia: 15, trafico: trafico.ALTO , costoPorKm: 6, activa : false},
    {id:4, distancia: 25, trafico: trafico.BAJO , costoPorKm: 3, activa : true},
    {id:5, distancia: 1, trafico: trafico.MEDIO , costoPorKm: 2, activa : false},
]

export {trafico as traficoEnum, routes as rutas};