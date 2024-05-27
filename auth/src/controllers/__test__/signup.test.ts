import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
    // /api/users that is prefixed from the middleware will not work
    return request(app)
        .post("/api/users/signup")
        .send({ email: "aklamaash@gmail.com", password: "akla123%" })
        .expect(201);
});

it("returns a 400 status code when credentials are invalid ", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({ email: "aklamaash", password: "akla123%" })
        .expect(400);
});

it("disallowing duplicating email id", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({ email: "aklamaash@gmail.com", password: "akla123%" })
        .expect(201);
    await request(app)
        .post("/api/users/signup")
        .send({ email: "aklamaash@gmail.com", password: "akla123%" })
        .expect(400);
});

it("sets a cookie after a successful signup", async () => {
    const response = await request(app)
        .post("/api/users/signup")
        .send({ email: "aklamaash@gmail.com", password: "akla123%" })
        .expect(201);
    expect(response.get("Set-Cookie")).toBeDefined();
});
