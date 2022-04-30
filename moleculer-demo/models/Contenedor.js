const {Schema, model} = require('mongoose');

const contenedorSchema = new Schema({
    _id: Schema.Types.ObjectId,
    BarcoIMO:String,
    Dimensiones:Array,
    Empresa: String,
    EspacioDisponible: Array,
    Ruta: Array,
    UbicacionActual: String,
    PesoMaximo: Number,
    PesoDisponible: Number,
    PrecioxKilo: Number
})

module.exports = model('Contenedor',contenedorSchema,'contenedor')