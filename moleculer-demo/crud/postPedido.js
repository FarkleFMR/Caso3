require('../src/conexion');
//const { processProducer } = require('../Kafka/Producer');


const PedidoModel = require('../models/Pedido');
const ContenedorModel = require('../models/Contenedor');
const ClienteModel = require('../models/cliente');

const paises = [ "USA", "Costa Rica", "Mexico" ]
const estados = [ "En curso", "Entregado", "Atrasado" ]
const ESTADO_EN_CURSO = estados[0]
const ESTADO_ENTREGADO = estados[1]
const ESTADO_ATRASADO = estados[2]

function isPaisValido(pais) {
    for(it in paises) {
        if(pais == paises[it]) {
            return true
        }
    }
    return false;
}

function fits(pedidoEspacio, contenedorEspacio)
{
    if(contenedorEspacio[0] >= pedidoEspacio[0] && contenedorEspacio[1] >= pedidoEspacio[1] && contenedorEspacio[2] >= pedidoEspacio[2]) {
        return true
    }
    else {
        return false
    }
}

async function postPedido(pClienteId, pContenedorId, pPeso, pEspacio, pDestino, pDescripcion){
    const contenedor = await ContenedorModel.findOne({_id:pContenedorId})
    const cliente = await ClienteModel.findOne({cedula:pClienteId})
    if(!cliente) {
        return { msg: "El cliente no existe"}
    }
    else if(!isPaisValido(pDestino) || pDestino == contenedor.ubicacion_actual) {
        return { msg: "El pais destino no es valido"}
    }
    else if(contenedor.PesoDisponible >= pPeso && fits(pEspacio, contenedor.EspacioDisponible)) {
        const currDate = new Date()
        const dateStr = currDate.getDate() + "-" + (currDate.getMonth() + 1) + "-" + currDate.getFullYear()

        const pedido = new PedidoModel({
            ClienteId: pClienteId,
            ContenedorId: pContenedorId,
            Descripcion: pDescripcion,
            Estado: ESTADO_EN_CURSO,
            Fecha: dateStr,
            Peso: pPeso,
            Ruta: [ contenedor.ubicacion_actual, pDestino ],
            Tamaño: pEspacio,
            ubicacion_actual: contenedor.ubicacion_actual,
            PrecioTotal: contenedor.PrecioXkilo * pPeso
        })

        pedido.save(function (err) {
            if (err) {
                console.log("No se pudo guardar el pedido")
            }
            else {
                contenedor.PesoDisponible = contenedor.PesoDisponible - pPeso
                for(it in contenedor.EspacioDisponible) {
                    contenedor.EspacioDisponible[it] = contenedor.EspacioDisponible[it] - pEspacio[it]
                }
                contenedor.save(function (err) {
                    if(err) {
                        console.log("No se pudo guardar el contenedor")
                    }
                })
            }
        });
        //processProducer("pedidos");
        return pedido
    }
    else {
        return { msg: "El contenedor no puede llevar este pedido"}
    }
}

module.exports = { postPedido }
