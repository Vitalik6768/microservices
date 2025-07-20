import express from "express";
import cors from "cors";
import { Kafka } from "kafkajs";

const app = express();



app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());



const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["localhost:9094"],
});

const producer = kafka.producer();

const connectToKafka = async () => {
  try {
    await producer.connect();
    console.log("Connected to Kafka");
  } catch (error) {
    console.log(error);
  }
  
}

connectToKafka();

app.post("/payment-service", async (req, res) => {
  const {cart} = req.body;
  const userId = '123'

  console.log('api endpoint hit')

  await producer.send({
    topic: "payment-successful",
    messages: [{ value: JSON.stringify({ userId, cart }) }],
  });

  return res.status(200).json({
    message: "Payment successful",
    userId,
    cart,
  });

});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8000, async () => {
  await connectToKafka();
  console.log("Payment service is running on port 8000");
});

app.get("/", (req, res) => {
  res.send("Payment service is running");
});

