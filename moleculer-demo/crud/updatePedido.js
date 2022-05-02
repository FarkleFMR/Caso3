require('../src/conexion');

const ActPedidoModel = require('../models/ActualizacionPedido');

async function updatePedido(pPedidoId, pEstado, pUbicacionActual){
    const contenedor = await ContenedorModel.findOne({_id:pContenedorId})
}

module.exports = { updatePedido }
