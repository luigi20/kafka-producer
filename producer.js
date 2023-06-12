import {Kafka} from 'kafkajs';
import {randomUUID} from 'node:crypto';

async function bootstrap(){
  const kafka = new Kafka({
    clientId: 'test-producer',
        brokers: ['exotic-cattle-10516-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'ZXhvdGljLWNhdHRsZS0xMDUxNiSiYf6pHrMkfYiluWmKio6qsJ89smXi8jViXPU',
          password: 'ab996a7dcbf74b63abbdd3d7e0609a90',
        },
        ssl: true,
    })

    const producer =kafka.producer();

    await producer.connect()
    const recipient_id = randomUUID();
    await producer.send({
      topic:'notifications.send-notification',
      messages:[
        {
          value: JSON.stringify({
            content:'Nova solicitação de amizade',
            category:'social',
            recipient_id:recipient_id,
          })
        },
      ],
    })
    await producer.disconnect()
}

bootstrap()
