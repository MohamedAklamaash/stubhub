import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ticket } from "../../models/ticketmodel";
import { natsWrapper } from "../../nats-wrapper";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      name: "Concert1",
      price: 1000,
      quantity: 10,
    })
    .expect(400);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      name: "Concert1",
      price: 1000,
      quantity: 10,
    })
    .expect(401);
});

it("returns a 400 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      name: "Concert1",
      price: 1000,
      quantity: 10,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      name: "Concert1",
      price: 1000,
      quantity: 10,
    })
    .expect(400);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      name: "Concert1",
      price: 1000,
      quantity: 10,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      name: "Concert1",
      price: 1000,
      quantity: 10,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      name: "Concert1",
      price: 1000,
      quantity: 10,
    })
    .expect(400);
});

// it("updates the ticket provided valid inputs", async () => {
//   const cookie = global.signin();

//   const response = await request(app)
//     .post("/api/tickets")
//     .set("Cookie", cookie)
//     .send({
//       name: "Concert1",
//       price: 1000,
//       quantity: 10,
//     });

//   const res = await request(app)
//     .put(`/api/tickets/${response.body.id}`)
//     .set("Cookie", cookie)
//     .send({
//       name: "Concert1",
//       price: 10000,
//       quantity: 10,
//     })
//     .expect(200);

//   const ticketResponse = await request(app)
//     .get(`/api/tickets/${response.body.ticket.id}`)
//     .send();

//   expect(ticketResponse.body.name).toEqual("Concert1");
//   expect(ticketResponse.body.price).toEqual(10000);
// });

// it("publishes an event", async () => {
//   const cookie = global.signin();

//   const response = await request(app)
//     .post("/api/tickets")
//     .set("Cookie", cookie)
//     .send({
//       name: "Concert1",
//       price: 1000,
//       quantity: 10,
//     });

//   await request(app)
//     .put(`/api/tickets/${response.body.id}`)
//     .set("Cookie", cookie)
//     .send({
//       name: "Concert1",
//       price: 1000,
//       quantity: 10,
//     })
//     .expect(200);

//   expect(natsWrapper.client.publish).toHaveBeenCalled();
// });

it("rejects updates if the ticket is reserved", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      name: "Concert1",
      price: 1000,
      quantity: 10,
    });

  const ticket = await Ticket.findById(response.body.ticket.id);
  if (!ticket) {
    throw new Error("Error in updating the ticket test");
  }
  ticket.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
  await ticket.save();

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      name: "Concert1",
      price: 1000,
      quantity: 10,
    })
    .expect(400);
});
