import request from "supertest";
import { app } from "../../app";
import { PreDefinedCookie } from "../../test/pre-def-cookie";

it("It helps u to create a new ticket", async () => {
    const res = await request(app)
        .post("/api/tickets")
        .send({
            name: "Concert",
            price: 1000,
            quantity: 1,
            postedBy: "665d3c3a70c96b326f05a7c2",
            tags: ["music", "singing"],
        })
        .set("Cookie", PreDefinedCookie())
        .expect(201);
    expect(res.body.name).toEqual("Concert");
});

it("returns an invalid error when someone who is not logged in", async () => {});

it("returns an error when invalid details are provided ", async () => {});

it("", async () => {});
