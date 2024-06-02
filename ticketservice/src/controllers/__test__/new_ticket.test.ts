import request from "supertest";
import { app } from "../../app";

it("It helps u to create a new ticket", async () => {
    const res = await request(app).post("/api/tickets").send({});
    expect(res.status).not.toEqual(404);
});

it("returns an invalid error when someone who is not logged in", async () => {
    console.log(global.signin());
    
    const res = await request(app)
        .post("/api/tickets")
        .send({});
    expect(res.status).toEqual(401);
});

it("returns an error when invalid details are provided ", async () => {
    await request(app).get("");
});
