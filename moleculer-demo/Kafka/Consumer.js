const { Kafka } = require('kafkajs');
var MongoClient = require('mongodb').MongoClient

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['25.5.33.88:9092']
});

//const url = 'mongodb://25.5.183.73:27023';

// Connection data
const url = 'mongodb://25.5.33.88:27040';
const client = new MongoClient(url);

const databaseActualizacion = 'actualizacion';

const collectionPedido = 'pedido';
const collectionRegistro = 'registro';

const topicPedido = 'pedidos';
const topicUpdates = 'actualizacion';
const topicRegistros = 'registrar';

const consumerNumber = process.argv[2] || '1';

const processConsumer  = async () => {
    const insertarPedidoConsumer = kafka.consumer({groupId: 'pedidos'});
    //const actualizarPedidoConsumer = kafka.consumer({groupId: 'ubicacion_actual'});
    //const registrarPedidoConsumer = kafka.consumer({groupId: '_id'});

    await Promise.all([
        insertarPedidoConsumer.connect(),
        //actualizarPedidoConsumer.connect(),
        //registrarPedidoConsumer.connect(),
        client.connect()  
    ]);

    await Promise.all([
        await insertarPedidoConsumer.subscribe({ topic: topicPedido }),
        //await actualizarPedidoConsumer.subscribe({ topic: topicUpdates }),
        //await registrarPedidoConsumer.subscribe({ topic: topicRegistros }),
    ]);

    let insertsCounter = 1;
    //let updatesCounter = 1;
    //let registerCounter = 1;

    await insertarPedidoConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // Logs
            logMessage(insertsCounter, `insertarPedidoConsumer#${consumerNumber}`, topic, partition, message);
            insertsCounter++;

            // Data send
            const database = client.db(databaseActualizacion);
            const recibe = database.collection(collectionPedido);
            //if (!recibe.find(object) === object) {
            //    recibe.insertOne(object);
            //}
            recibe.insertOne(JSON.parse(message.value.toString()));
        },
    });
    /**
    await actualizarPedidoConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // Logs
            logMessage(updatesCounter, `actualizarPedidoConsumer#${consumerNumber}`, topic, partition, message);
            updatesCounter++;

            // Data send
            const database = client.db(databaseActualizacion);
            const recibe = database.collection(collectionPedido);
            recibe.insertOne(JSON.parse(message.value.toString()));

          
        },
    });

    await registrarPedidoConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // Logs
            logMessage(registerCounter, `registrarPedidoConsumer#${consumerNumber}`, topic, partition, message);
            registerCounter++;

            // Data send
            const database = client.db(databaseActualizacion);
            const recibe = database.collection(collectionRegistro);

            recibe.insertOne(JSON.parse(message.value.toString()));
        },
    });
    */
};

const logMessage = (counter, consumerName, topic, partition, message) => {
    console.log(`received a new message number: ${counter} on ${consumerName}: `, {
        topic,
        partition,
        message: {
            offset: message.offset,
            headers: message.headers,
            value: message.value.toString()
        },
    });
};

processConsumer();