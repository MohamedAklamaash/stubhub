import express from "express";
import cookieSession from "cookie-session"; // gives us that .session prop in req
import { json } from "body-parser";
import { router as userRouter } from "./route/route";
import { errorHandler } from "./middleware/error-handler";
import { NotfoundError } from "./errors/not-found-err";
import "express-async-errors";
import mongoose from "mongoose";
import { DatabaseConnError } from "./errors/db-conn-err";
const app = express();

// makes sure that our auth service is aware that there is a proxy ingress-ngnix that is running this service
app.set("trust proxy", true);
app.use(json());
app.use(
    cookieSession({
        signed: false, // encryption is not done here cuz jwt itself is tamper resistent
        secure: true,
    })
);
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
