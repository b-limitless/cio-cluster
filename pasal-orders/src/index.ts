import { app } from "./app";
import mongoose from "mongoose";
import { ProductCreatedListener } from "./events/listeners/product-created-listener";
import { rabbitMQWrapper } from "@pasal/common";
import connectToRabbitMQ from "@pasal/common/build/rabbitmq/connection";


const start = async () => {
  if (!process.env.RABBIT_MQ_URL) {
    throw new Error("Rabbit MQ URL is not defined");
  }
  if (!process.env.JWT_KEY) {
    throw new Error("JWT key must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }

  connectToRabbitMQ(() => {
    new ProductCreatedListener(rabbitMQWrapper.client).listen();
  });
};

start();

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
