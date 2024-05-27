// returns a cookie with the jwt
import request from "supertest";
import { app } from "../app";

const getAuthCookieAfterSignUp = async () => {
    const response = await request(app)
        .post("/api/users/signup")
        .send({ email: "aklamaash@gmail.com", password: "akla123%" })
        .expect(201);
    const cookie = response.get("Set-Cookie"[0]);
    return cookie;
};
