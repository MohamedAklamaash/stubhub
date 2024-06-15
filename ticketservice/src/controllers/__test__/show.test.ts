import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/tickets/${id}`).send().expect(400);
});

// it("returns the ticket if the ticket is found", async () => {
//   const name = "Concert1";
//   const price = 20;

//   const title = "Concert1";

//   const response = await request(app)
//     .post("/api/tickets")
//     .set("Cookie", global.signin())
//     .send({
//       name: "Concert1",
//       price: 1000,
//       quantity: 10,
//     })
//     .expect(200);
//     console.log(response);
    
//   const ticketResponse = await request(app)
//     .get(`/api/tickets/${response.body.id}`)
//     .send()
//     .expect(200);
  
//   expect(ticketResponse.body.name).toEqual(name);
//   expect(ticketResponse.body.price).toEqual(price);
// });
