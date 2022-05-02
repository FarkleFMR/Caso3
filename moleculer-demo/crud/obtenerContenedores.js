require('../src/conexion');

const ContenedorModel = require('../models/Contenedor');

async function buscarContenedores(pPais){
    const contenedores = await ContenedorModel.find({UbicacionActual:pPais});
    console.log(pPais)
    return contenedores
}

async function buscarContenedor(pId){
    const contenedor = await ContenedorModel.find({_id:pId});
    return contenedor
}

module.exports = { buscarContenedores, buscarContenedor }
