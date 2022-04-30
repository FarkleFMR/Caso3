const {Schema, model} = require('mongoose');

const clienteSchema = new Schema({
    nombre:String,
    correo:String,
    cedula:String,
    pais:String
})

module.exports = model('Cliente',clienteSchema,'cliente')
