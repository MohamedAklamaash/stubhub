import mongoose from "mongoose";
import { DatabaseConnError } from "@sthubhub-aklamaash/common";
import { app } from "./app";
import jwt from "jsonwebtoken";
declare global {
    function signin(): string[];
}

global.signin = () => {
    const payload = {
        name: "Mohamed Aklamaash",
        email: "aklamaash@gmail.com",
        password: "Aklamaashehsan123%",
    };
    const token = jwt.sign(payload, process.env.JWT_KEY!);
    const session = { jwt: token };
    const sessionJSON = JSON.stringify(session);
    const base64 = Buffer.from(sessionJSON).toString("base64"); // converted into base64 to decode it into a jwt token
    return [`express:sess=${base64}`];
};

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
