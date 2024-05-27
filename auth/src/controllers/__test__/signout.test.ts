import request from "supertest";
import { app } from "../../app";

it("clears the cookie after signing out", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({ email: "aklamaash@gmail.com", password: "akla123%" })
        .expect(201);
    
    const response = await request(app)
        .post("/api/users/signout")
        .send({})
        .expect(200);

    const setCookieHeader = response.get("Set-Cookie");
    
    if (setCookieHeader) {
        expect(setCookieHeader[0]).toEqual(
            "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
        );
    } else {
        throw new Error("Set-Cookie header not present in response");
    }
});
