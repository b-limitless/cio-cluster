import amqp, {Channel } from "amqplib";


class RabbitMQWrapper {
  private _client?: Channel;

  get client() {
    if (!this._client) {
      throw new Error(`Could not connect to Rabbit`);
    }
    return this._client;
  }

 
  async connect() {
    try {
      if (!process.env.RABBIT_MQ_URL) {
        throw new Error("Rabbit MQ URL is not defined");
      }
      const broker = await amqp.connect(process.env.RABBIT_MQ_URL);
      try {
        const channel = await broker.createChannel();

        // await channel.assertExchange(exchange, "fanout", {
        //   durable: false,
        // });
        this._client = channel;

      } catch (err) {
        console.log(err);
      }
      console.log("I am a connection to RabbitMQ 🐰");
    } catch (err) {
      console.log(err);
    }
  }
}

export const rabbitMQWrapper = new RabbitMQWrapper();
