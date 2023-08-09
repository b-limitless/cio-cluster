import { Channel } from "amqplib";
import logger from "../logger";

interface Event {
  data: any;
  subject: string;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T["subject"];
  public readonly client: Channel;

  constructor(client: Channel) {
    this.client = client;
  }

  async publish(data: T["data"]) {
    const channel = this.client;
    await channel.assertExchange(this.subject, "fanout", {
      durable: true,
    });

    channel.publish(this.subject, "", Buffer.from(JSON.stringify(data)));
    logger.log("info", " [x] Sent %s", data);
  }
}
