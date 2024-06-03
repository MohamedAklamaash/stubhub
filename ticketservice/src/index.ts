import mongoose from "mongoose";
import { DatabaseConnError } from "@sthubhub-aklamaash/common";
import { app } from "./app";

(async () => {
    try {
        await mongoose.connect(
            `mongodb://${process.env.MONGO_URI}:27017/ticket`
        );
        console.log("Connected to mongodb in ticketing service successfully!!");
    } catch (error) {
        throw new DatabaseConnError();
    }
    app.listen(3000, () => {
        console.log("Ticketing service running on port 3000");
    });
})();
