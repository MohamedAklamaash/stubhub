import request from "supertest";
import { app } from "../../app";

it("responds with details about the current user", async () => {
    const signupres = await request(app)
        .post("/api/users/signup")
        .send({ email: "aklamaash@gmail.com", password: "akla123%" })
        .expect(201);

    const signupcookie = signupres.get("Set-Cookie");

    if (!signupcookie) {
        throw new Error("Cookie is not defined");
    }

    const response = await request(app)
        .get("/api/users/currentuser")
        .set("Cookie", signupcookie)
        .send({})
        .expect(200);

    expect(response.body.currentUser.email).toEqual("aklamaash@gmail.com");
});

it("responds with null cuz no jwt is found", async () => {
    const response = await request(app)
        .get("/api/users/currentuser")
        .send({})
        .expect(200);

    expect(response.body.currentUser?.email).toEqual(undefined);
});
