import express, { Request, Response } from "express";
import cookieSession from "cookie-session"; // gives us that .session prop in req
import { json } from "body-parser";
import { errorHandler, NotfoundError } from "@sthubhub-aklamaash/common";
import "express-async-errors"; //makes us throw errs in catch block
import { router as ticketRouter } from "./routes/route";
import { currentUserMiddleware } from "@sthubhub-aklamaash/common";
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
app.use(currentUserMiddleware); // this make the req.currentUser prop available in this service scope
app.use("/api/tickets", ticketRouter);

app.use(errorHandler);


app.all("*", () => {
    throw new NotfoundError();
});

export { app };
