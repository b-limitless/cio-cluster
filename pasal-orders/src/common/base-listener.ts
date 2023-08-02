import { Channel, Message } from "amqplib";

interface Event {
  data: any;
  subject: string;
}

abstract class Listener<T extends Event> {
  abstract subject: string;
  public channel: Channel;

  abstract onMessage(data: T["data"], message: any): void;

  public msg: any;

  constructor(channel: Channel) {
    this.channel = channel;
  }

  async listen() {
    try {
      await this.channel.assertExchange(this.subject, "fanout", {
        durable: false,
      });
      const q = await this.channel.assertQueue("", { exclusive: true });
      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        q.queue
      );
      this.channel.bindQueue(q.queue, this.subject, "");
      this.channel.consume(
        q.queue,
        (msg) => {
          this.onMessage(msg?.content.toString(), msg);
        },
        {
          noAck: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
}

export { Listener };
