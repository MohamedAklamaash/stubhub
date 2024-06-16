import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/TicketModel";

it("fetches the order", async () => {
  // Create a ticket
  const ticket = await Ticket.create({
    id: new mongoose.Types.ObjectId(),
    name: "concert",
    price: 20,
    quantity: 10,
  });
  await ticket.save();

  const user = global.signin();
  // make a request to create an order with this ticket
  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id, quantity: 2 })
    .expect(201);

  // make request to fetch the order
  const res1 = await request(app)
    .get(`/api/orders/${res.body.order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

    console.log("Res1:",res1);
    

  // expect(fetchedOrder.id).toEqual(res.body.order.id);
});

// it("returns an error if one user tries to fetch another users order", async () => {
//   // Create a ticket
//   const ticket = await Ticket.create({
//     id: new mongoose.Types.ObjectId().toHexString(),
//     name: "concert",
//     price: 20,
//     quantity: 10,
//   });
//   await ticket.save();

//   const user = global.signin();
//   // make a request to create an order with this ticket
//   const { body: order } = await request(app)
//     .post("/api/orders")
//     .set("Cookie", user)
//     .send({ ticketId: ticket.id, quantity: 2 })
//     .expect(201);

//   // make request to fetch the order
//   await request(app)
//     .get(`/api/orders/${order.id}`)
//     .set("Cookie", global.signin())
//     .send()
//     .expect(401);
// },5000);
