import Request from "supertest";
import { app } from "../../app";

it("get a 200 after successful signin", async () => {
    await Request(app)
        .post("/api/users/signup")
        .send({ email: "aklamaash@gmail.com", password: "akla123%" })
        .expect(201);
    const response = await Request(app)
        .post("/api/users/signin")
        .send({ email: "aklamaash@gmail.com", password: "akla123%" })
        .expect(200);
    expect(response.get("Set-Cookie")).toBeDefined();
});

it("fails when an email is not available in the database", async () => {
    await Request(app)
        .post("/api/users/signin")
        .send({ email: "aklamaash@gmail.com", password: "akla123%" })
        .expect(400);
});

it("fails when an incorrect password is supplied as credential", async () => {
    await Request(app)
        .post("/api/users/signup")
        .send({ email: "aklamaash@gmail.com", password: "akla123%" })
        .expect(201);
    await Request(app)
        .post("/api/users/signin")
        .send({ email: "aklamaash@gmail.com", password: "akla%" })
        .expect(400);
});
