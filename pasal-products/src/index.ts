import 'dotenv/config';
import logger from "@pasal/common/build/logger";
import { app } from "./app";
import connectToRabbitMQ from "@pasal/common/build/rabbitmq/connection"
import mongoose from "mongoose";
import { UserCreatedListener } from './events/listeners/user-created-listener';
import { rabbitMQWrapper } from '@pasal/common';
import { UserVerifiedListener } from './events/listeners/user-verified-listener';
import { ProfileUpdatedListener } from './events/listeners/profile-updated-listener';

// While working on isolated mode
// process.env.JWT_KEY = "asdf";
// process.env.MONGO_URI = "mongodb+srv://bharatrosedb:ThisIsMyLife123@mydb59589.l8gpx.mongodb.net/mydb59589";
// process.env.NODE_ENV = "development"


const start = async () => {

  if (!process.env.RABBIT_MQ_URL) {
    logger.log({
      level: "error", 
      message: "Rabbit MQ URL is not defined"
    })
    throw new Error("Rabbit MQ URL is not defined");
  }
  // Cloudinary Configurations
  if(!process.env.CLOUD_NAME 
     || !process.env.CLOUD_API_KEY 
     || !process.env.CLOUD_API_SECRET) {
    logger.log({
      level: "error", 
      message: "Cloud name, api key and api secret must be defined"
    }); 
    throw new Error("Cloud name, api key and api secret must be defined");
  }
  if (!process.env.JWT_KEY) {
    logger.log({
      level: "error", 
      message: "JWT key must be defined"
    })
    throw new Error("JWT key must be defined");
  }
  if (!process.env.MONGO_URI) {
    logger.log({
      level: "error", 
      message: "MONGO_URI must be defined"
    })
    throw new Error("MONGO_URI must be defined");
  }

  // Listening user created listener
  try {
    connectToRabbitMQ(() => {
      new UserCreatedListener(rabbitMQWrapper.client).listen();
      new UserVerifiedListener(rabbitMQWrapper.client).listen();
      new ProfileUpdatedListener(rabbitMQWrapper.client).listen();
    });
    
  } catch(err) {
    logger.log("error", `Could not listen to user created event: ${err}`);
  }
  

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    logger.log({
      level: "info", 
      message: "Connected to MongoDB"
    })
  } catch (error) {
    logger.log({
      level: "error", 
      message: `Error while connecting to MonogDB: ${error}`
    })
  }
  
};

start();

app.listen(3000, () => {
  logger.log({
    level: "info", 
    message: "Listening on port 3000"
  })
});
