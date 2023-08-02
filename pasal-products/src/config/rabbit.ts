import { BrokerConfig } from "rascal";

export const config: BrokerConfig = {
  vhosts: {
    "/": {
      assert: true,
      connection: {
        url: "amqp://rabbitmq-srv:5672",
        options: {
          heartbeat: 5,
        },
        retry: {
          min: 1000,
          max: 60000,
          factor: 2,
          strategy: "exponential",
        },
      },
      exchanges: {
        demo_ex: {
          assert: true,
          type: "fanout",
        },
      },
      queues: ["demo_q"],
      bindings: ["demo_ex[a.b.c] -> demo_q"],
      publications: {
        "product:created": {
          exchange: "demo_ex",
          routingKey: "a.b.c",
        },
      },
      subscriptions: {
        "product:created": {
          queue: "demo_q",
          prefetch: 3,
        },
      },
    },
  },
};
