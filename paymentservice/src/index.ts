import mongoose from "mongoose";
import { DatabaseConnError } from "@sthubhub-aklamaash/common";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
(async () => {
    try {
        await mongoose.connect(
            `mongodb://${process.env.MONGO_URI}:27017/ticket`
        );
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
       
        console.log("Connected to mongodb in ticketing service successfully!!");
    } catch (error) {
        throw new DatabaseConnError();
    }
    app.listen(3000, () => {
        console.log("Ticketing service running on port 3000");
    });
})();
