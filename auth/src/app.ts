import express from "express";
import cookieSession from "cookie-session"; // gives us that .session prop in req
import { json } from "body-parser";
import { router as userRouter } from "./route/route";
import { errorHandler } from "@sthubhub-aklamaash/common";
import { NotfoundError } from "@sthubhub-aklamaash/common";
import "express-async-errors"; //makes us throw errs in catch block

const app = express();

// makes sure that our auth service is aware that there is a proxy ingress-ngnix that is running this service
app.set("trust proxy", true);
app.use(json());
app.use(
    cookieSession({
        signed: false, // encryption is not done here cuz jwt itself is tamper resistent
        secure: process.env.NODE_ENV !== "test",
    })
);
app.use("/api/users", userRouter);
app.use(errorHandler);

app.all("*", () => {
    throw new NotfoundError();
});

export { app };
