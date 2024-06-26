import { OrderCreatedListener } from "./events/listeners/OrderCreatedListener";
import { natsWrapper } from "./nats-wrapper";

(async () => {
    try {
        // ticketing is the cluster id as specified in the nats deply yaml
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID!,
            process.env.NATS_CLIENT_ID!, //client id here is the name of the pod
            process.env.NATS_URL!
        );
        natsWrapper.client.on("close", () => {
            console.log("NATS connection closed");
            process.exit();
        });
        process.on("SIGTERM", () => {
            natsWrapper.client?.close();
        });
        process.on("SIGINT", () => {
            natsWrapper.client?.close();
        });
        new OrderCreatedListener(natsWrapper.client).listen();
    } catch (error) {}
})();
