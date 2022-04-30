const {Schema, model} = require('mongoose');

const clienteSchema = new Schema({
    nombre: String,
    correo: String,
    cedula: String,
    pais: String,
    _id: Schema.Types.ObjectId
})

module.exports = model('Cliente',clienteSchema,'cliente')
