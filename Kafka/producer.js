const { Kafka } = require('kafkajs');
var MongoClient = require('mongodb').MongoClient

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

const url = 'mongodb://25.5.183.73:27023';

const client = new MongoClient(url);
const topicName = 'losTacosSonVida';

const databaseName = 'taquitosTest';
const collection = 'tacos';

const processProducer  = async () => {
    const producer = kafka.producer();
    await producer.connect();
    await client.connect();
    
    // Connection
    const database = client.db(databaseName);
    const pasar = database.collection(collection);

    // Data storage
    const jsons = await pasar.find({}).toArray();
    const inserts = []

    filterData(jsons, inserts);

    // Data publish
    for (var i = 0; i < inserts.length; i++) {
        await producer.send({
            topic: topicName,
            messages: [
                { value: JSON.stringify(inserts[i]) },
            ],
        });
    }
};

function filterData(jsons, inserts) {
    jsons.forEach(json => {
        if(collection=='pedido') {
            inserts.push(filtrarPedido(json))
        } 
        else if(collection=='registro'){
            inserts.push(filtrarRegistro(json))
        }
        else if(collection=='tacos'){
            inserts.push(filtrarTaco(json))
        }
    });    
}

function filtrarTaco(field) {
    const id = field._id;
    const nombre = field.nombre;
    const precio = field.precio
    
    return { "_id":id, "nombre":nombre, "precio":precio }
}

function filtrarPedido(field) {
    const id = field._id;
    const clienteId = field.clienteId
    const estado = field.estado;
    const fecha = new Date();
    const ubicacionActual = field.uubicacionActual;
    return {"_id":id, "clienteId":clienteId, "estado":estado, "ultimaActualizacion":fecha, "ubicacionActual":ubicacionActual}
}

function filtrarRegistro(field) {
    const pedidoId = field._id;
    const clienteId = field.clienteId
    const estado = field.estado;
    const fecha = new Date();
    const origen = field.ruta.origen;
    const destino = field.ruta.destino;
    const ubicacionActual = field.uubicacionActual;
    return {"pedidoId":pedidoId, "clienteId":clienteId, "estado":estado, "ultimaActualizacion":fecha, "origen":origen, "destino":origen, "ubicacionActual":ubicacionActual}
}

processProducer().then(() => {
    console.log('done');
    process.exit();
});