require('../src/conexion');

const ContenedorModel = require('../models/Contenedor');

async function buscarContenedores(pPais){
    const contenedores = await ContenedorModel.find({UbicacionActual:pPais});
    console.log(pPais)
    return contenedores
}

module.exports = { buscarContenedores }
