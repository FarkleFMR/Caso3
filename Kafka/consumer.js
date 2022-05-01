const { Kafka } = require('kafkajs');
var MongoClient = require('mongodb').MongoClient

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

//const url = 'mongodb://25.5.183.73:27023';

// Connection data
const url = 'mongodb://25.5.33.88:27020';
const client = new MongoClient(url);
const databaseName = 'Jenaro';
const collection = 'prueba';
const topicName = 'losTacosSonVida';
const consumerNumber = process.argv[2] || '1';


const processConsumer  = async () => {
    const tacosConsumer = kafka.consumer({groupId: 'tacos'});

    await Promise.all([
        tacosConsumer.connect(),
        client.connect()  
    ]);

    await Promise.all([
        await tacosConsumer.subscribe({ topic: topicName }),
    ]);

    let orderCounter = 1;

    await tacosConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // Logs
            logMessage(orderCounter, `tacosConsumer#${consumerNumber}`, topic, partition, message);
            orderCounter++;

            // Data send
            const database = client.db(databaseName);
            const recibe = database.collection(collection);
            recibe.insertOne(JSON.parse(message.value.toString()));
        },
    });
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