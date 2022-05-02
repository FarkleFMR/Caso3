const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['25.5.33.88:9092']
});

const topicName1 = 'pedidos';
const topicName2 = 'actualizacion';
const topicName3 = 'registrar'

const process  = async () => {
    const admin = kafka.admin();
    await admin.connect();
    await admin.createTopics({
        topics: [{
            topic: topicName1,
            numPartitions: 1,
            replicationFactor: 1
        },
        {
            topic: topicName2,
            numPartitions: 1,
            replicationFactor: 1
        },
        {
            topic: topicName3,
            numPartitions: 1,
            replicationFactor: 1
        }],
    });
    await admin.disconnect();
};

process().then(() => console.log('done')); 