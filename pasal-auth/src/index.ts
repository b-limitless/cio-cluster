import { app } from "./app";
import mongoose from "mongoose";
import { ProductCreatedListener } from "./events/listeners/product-created-listener";
import logger from "./logger";
import connectToRabbitMQ from "@pasal/common/build/rabbitmq/connection";
import { rabbitMQWrapper } from "@pasal/common";

// process.env.JWT_KEY = "asdf";
// process.env.MONGO_URI = "mongodb+srv://bharatrosedb:ThisIsMyLife123@mydb59589.l8gpx.mongodb.net/mydb59589";
// process.env.NODE_ENV = "development"



const start = async () => {
  // if (!process.env.RABBIT_MQ_URL) {
  //   logger.log({
  //     level: "error",
  //     message: "Rabbit MQ URL is not defined"
  //   });
  //   throw new Error("Rabbit MQ URL is not defined");
  // }
  if (!process.env.JWT_KEY) {
    logger.log({
      level: "error",
      message: "JWT key must be defined"
    });
    throw new Error("JWT key must be defined");
  }
  if (!process.env.MONGO_URI) {
    logger.log({
      level: "error",
      message: "MONGO_URI must be defined"
    });
    throw new Error("MONGO_URI must be defined");
  }


  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    logger.log({
      level: "info",
      message: "connected to mongod"
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: `Error while connecting with MongoDB:${error}`
    });
  }

  connectToRabbitMQ(() => {
    new ProductCreatedListener(rabbitMQWrapper.client).listen();
  });
  
};

start();

app.listen(3000, () => {
  logger.log({
    level: "info",
    message: `Listening on port 3000`
  });
});
