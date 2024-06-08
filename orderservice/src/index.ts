import mongoose, { version } from "mongoose";
import { DatabaseConnError, Subjects } from "@sthubhub-aklamaash/common";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { TicketCreatedListener } from "./events/listeners/Ticket-created-listener";
import { TicketUpdatedListener } from "./events/listeners/TicketUpdatedListener";
import nats, { Message } from "node-nats-streaming";
import { Ticket } from "./models/TicketModel";

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`);
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
            natsWrapper.client.close();
        });

        process.on("SIGINT", () => {
            natsWrapper.client.close();
        });

        new TicketCreatedListener(natsWrapper.client).listen();
        new TicketUpdatedListener(natsWrapper.client).listen();
        // const dummy = natsWrapper.client.subscribe(Subjects.TicketCreated);
        // dummy.on("message", (msg: Message) => {
        //     console.log("Listener Working:", msg.getData());
        //     const data = msg.getData();
        //     const vals =
        //         typeof data === "string"
        //             ? JSON.parse(data)
        //             : JSON.parse(data.toString("utf8"));
        //     (async () => {
        //         const dummy1 = await Ticket.create(vals);
        //         await dummy1.save();
        //         console.log("create ticket:", dummy1);
        //     })();

        //     msg.ack();
        // });
        console.log("Connected to mongodb in order service successfully!!");
    } catch (error) {
        throw new DatabaseConnError();
    }
    app.listen(3000, () => {
        console.log("Order service running on port 3000");
    });
})();
