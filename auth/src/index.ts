import express from "express";
import { json } from "body-parser";
import { router as userRouter } from "./route/route";
import { errorHandler } from "./middleware/error-handler";
import { NotfoundError } from "./errors/not-found-err";
import "express-async-errors";
import mongoose from "mongoose";
import { DatabaseConnError } from "./errors/db-conn-err";
const app = express();
app.use(json());

app.use("/api/users", userRouter);
app.use(errorHandler);

app.all("*", () => {
    throw new NotfoundError();
});

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
