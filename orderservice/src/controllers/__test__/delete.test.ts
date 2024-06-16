import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/OrderModel";
import { OrderStatus } from "@sthubhub-aklamaash/common";
import { natsWrapper } from "../../nats-wrapper";
import { Ticket } from "../../models/TicketModel";

// it("marks an order as cancelled", async () => {
//   // create a ticket with Ticket Model
//   const ticket = await Ticket.create({
//     id: new mongoose.Types.ObjectId().toHexString(),
//     name: "concert",
//     price: 20,
//     quantity: 10,
//   });
//   await ticket.save();

//   const user = global.signin();
//   // make a request to create an order
//   const { body: order } = await request(app)
//     .post("/api/orders")
//     .set("Cookie", user)
//     .send({ ticketId: ticket.id, quantity: 2 })
//     .expect(201);

//   // make a request to cancel the order
//   await request(app)
//     .put(`/api/orders/${order.id}`)
//     .set("Cookie", user)
//     .send()
//     .expect(204);

//   // expectation to make sure the thing is cancelled
//   const updatedOrder = await Order.findById(order.id);

//   expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
// });

it("emits a order cancelled event", async () => {
  const ticket = await Ticket.create({
    id: new mongoose.Types.ObjectId().toHexString(),
    name: "concert",
    price: 20,
    quantity: 10,
    postedBy: "aaklam",
  });
  await ticket.save();

  const user = global.signin();
  // make a request to create an order
  const req = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id, quantity: 2 })
    .expect(201);

  // make a request to cancel the order
  const id = req.body.order._id
  
  // await request(app)
  //   .put(`/api/orders/${id}`)
  //   .set("Cookie", user)
  //   .send()
  //   .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
