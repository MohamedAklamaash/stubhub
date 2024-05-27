import mongoose from "mongoose";
import { DatabaseConnError } from "./errors/db-conn-err";
import { app } from "./app";
(async () => {
    try {
        await mongoose.connect(`mongodb://auth-mongo-service:27017/auth`);
        console.log("Connected to mongodb in auth service successfully!!");
    } catch (error) {
        throw new DatabaseConnError();
    }
    app.listen(3000, () => {
        console.log("Auth service running on port 3000");
    });
})();
