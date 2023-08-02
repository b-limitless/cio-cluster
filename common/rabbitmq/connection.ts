import { rabbitMQWrapper } from "./RabbitMQWrapper";
import logger from "../logger";

const connectToRabbitMQ = async (callback?:() => void) => {
    try {
      await rabbitMQWrapper.connect();
      rabbitMQWrapper.client.on("error", (err) => {
        logger.log({
          level: 'error',
          message: `RabbitMQ Connection Error ${err}`
        });
        setTimeout(connectToRabbitMQ, 10000); // Retry connection after 10 seconds
      });
      if(callback) {
        callback();
      }
      
    } catch (err) {
      logger.log({
        level: 'error',
        message: `RabbitMQ Connection Error: ${err}`
      });
      ;
      // Attempt to reconnect when there's an errors
      setTimeout(connectToRabbitMQ, 10000); // Retry connection after 10 seconds
    }
  };

  export default connectToRabbitMQ;