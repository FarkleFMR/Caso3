require('../src/conexion');

const clienteModel = require('../models/cliente')

async function buscarUnCliente(pCedula){
    const cliente = await clienteModel.findOne({cedula:pCedula});
    console.log(cliente.nombre)
    return cliente.pais
}

module.exports = { buscarUnCliente }

