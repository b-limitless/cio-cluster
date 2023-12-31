import 'dotenv/config';
import { app } from "./app";
import mongoose from "mongoose";
import logger from "./logger";
import connectToRabbitMQ from "@pasal/common/build/rabbitmq/connection";
import { rabbitMQWrapper } from "@pasal/common";
import { FebricCreatedListener } from "./events/listeners/febric-created-listener";
import { FebricDeletedListener } from "./events/listeners/febric-deleted.listener";
import { FebricUpdatedListener } from "./events/listeners/febric-updated-listener";

// 
// Hello World
const start = async () => {
  if (!process.env.RABBIT_MQ_URL) {
    logger.log({
      level: "error",
      message: "Rabbit MQ URL is not defined"
    });
    // throw new Error("Rabbit MQ URL is not defined");
  }
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
  
  try {
    connectToRabbitMQ(() => {
      new FebricCreatedListener(rabbitMQWrapper.client).listen();
      new FebricDeletedListener(rabbitMQWrapper.client).listen();
      new FebricUpdatedListener(rabbitMQWrapper.client).listen();
    });

  } catch(err) {
    logger.log("error", "Could not listen to the events");
    logger.log("error", err)
  }
  
  
};

start();

app.listen(3000, () => {
  logger.log({
    level: "info",
    message: `Hello world, Listening on port 3000`
  });
});
