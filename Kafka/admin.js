const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

const topicName = 'losTacosSonVida';

const process  = async () => {
    const admin = kafka.admin();
    await admin.connect();
    await admin.createTopics({
        topics: [{
            topic: topicName,
            numPartitions: 1,
            replicationFactor: 1
        }],
    });
    await admin.disconnect();
};

process().then(() => console.log('done'));