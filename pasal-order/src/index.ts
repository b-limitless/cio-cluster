import 'dotenv/config';
import { app } from "./app";
import mongoose from "mongoose";
import { rabbitMQWrapper } from "@pasal/common";
import connectToRabbitMQ from "@pasal/common/build/rabbitmq/connection";
import { FebricCreatedListener } from "./events/listeners/febric-created-listener";
import { FebricUpdatedListener } from "./events/listeners/febric-updated-listener";
import { FebricDeletedListener } from "./events/listeners/febric-deleted.listener";
import { UserCreatedListener } from "./events/listeners/user-created-listener";
import { ProfileUpdatedListener } from "./events/listeners/profile-updated-listener";
import { UserVerifiedListener } from "./events/listeners/user-verified-listener";
import logger from '@pasal/common/build/logger';
// Hello World.
const start = async () => {
  if (!process.env.RABBIT_MQ_URL) {
    throw new Error("Rabbit MQ URL is not defined");
  }
  if (!process.env.JWT_KEY) {
    logger.log("error", "JWT key must be defined")
    throw new Error("JWT key must be defined");
  }
  if (!process.env.MONGO_URI) {
    logger.log("error", "MONGO_URI must be defined")
    throw new Error("MONGO_URI must be defined");
  }
// 
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    logger.log("info", "Conneced with MongoDB")
  } catch (error) {
    logger.log("info", `Cound not connect to MongoDB ${error}`);
  }

  connectToRabbitMQ(() => {
    const rabbitClient = rabbitMQWrapper.client;

    // Febric events listener
    new FebricCreatedListener(rabbitClient).listen();
    new FebricUpdatedListener(rabbitClient).listen();
    new FebricDeletedListener(rabbitClient).listen();

    // User events listener
    new UserCreatedListener(rabbitClient).listen();
    new ProfileUpdatedListener(rabbitClient).listen();
    new UserVerifiedListener(rabbitClient).listen();
  });
};

start();

app.listen(3000, () => {
  logger.log("info", "Listening on port 3000")
});
