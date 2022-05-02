const {Schema, model} = require('mongoose');

const pedidoSchema = new Schema({
    ClienteId:String,
    ContenedorId:String,
    Descripcion: String,
    Estado: String,
    Fecha: String,
    Peso: Number,
    Ruta: Array,
    Tamaño: Array,
    UbicacionActual: String,
    PrecioTotal: Number
})

module.exports = model('Pedido', pedidoSchema,'pedido')
