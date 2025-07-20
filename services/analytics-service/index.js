import { Kafka } from "kafkajs";


const kafka = new Kafka({
    clientId: "analytics-service",
    brokers: ["localhost:9094"],
  });

const consumer = kafka.consumer({ groupId: "analytics-service" });

const run = async () => {

    await consumer.connect();
    await consumer.subscribe({ topic: "payment-successful", fromBeginning: true });
    
}
