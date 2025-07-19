import express from "express";
import cors from "cors";

const app = express();


app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());

app.post("/payment-service", async (req, res) => {
  const {cart} = req.body;
  const userId = '123'

  console.log('api endpoint hit')

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

app.listen(8000, () => {
  console.log("Payment service is running on port 8000");
});

app.get("/", (req, res) => {
  res.send("Payment service is running");
});

