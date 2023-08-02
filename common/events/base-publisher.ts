import {Channel} from 'amqplib';


interface Event {
    data: any;
    subject: string;
}

export abstract class Publisher<T extends Event> {
    abstract subject: T["subject"];
    public client:Channel;


    constructor(client: Channel) {
        this.client = client;
    }

    async publish(data: T["data"]) {
        const channel = this.client;
        await channel.assertExchange(this.subject, "fanout", {
            durable: false,
          });
          
        await channel.publish(this.subject, '', Buffer.from(JSON.stringify(data)));
        console.log(" [x] Sent %s", data);
    }
}