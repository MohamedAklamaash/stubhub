import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/OrderModel";
import { OrderStatus } from "@sthubhub-aklamaash/common";
import { natsWrapper } from "../../nats-wrapper";
import { Ticket } from "../../models/TicketModel";

it("returns an error if the ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId, quantity: 2 })
    .expect(400);
});

it("returns an error if the ticket is already reserved", async () => {
  const ticket = await Ticket.create({
    id: new mongoose.Types.ObjectId().toHexString(),
    name: "concert",
    price: 20,
    quantity: 10,
  });
  await ticket.save();
  const order = await Order.create({
    ticket,
    userId: "laskdflkajsdf",
    status: OrderStatus.Created,
    expiresAt: new Date().toISOString(),
    quantity: 2,
  
  });
  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id, quantity: 2  })
    .expect(400);
});

it("reserves a ticket", async () => {
  const ticket = await Ticket.create({
    id: new mongoose.Types.ObjectId().toHexString(),
    name: "concert",
    price: 20,
    quantity: 10,
  });
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id, quantity: 2  })
    .expect(201);
});

it("emits an order created event", async () => {
  const ticket = await Ticket.create({
    id: new mongoose.Types.ObjectId().toHexString(),
    name: "concert",
    price: 20,
    quantity: 10,
  });
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id, quantity: 2  })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
