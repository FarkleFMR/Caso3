const {Schema, model} = require('mongoose');

const contenedorSchema = new Schema({
    _id: Schema.Types.ObjectId,
    BarcoIMO:String,
    Dimensiones:Array,
    Empresa: String,
    EspacioDisponible: Array,
    Ruta: Array,
    ubicacion_actual: String,
    PesoMaximo: Number,
    PesoDisponible: Number,
    PrecioXkilo: Number
})

module.exports = model('Contenedor',contenedorSchema,'contenedor')