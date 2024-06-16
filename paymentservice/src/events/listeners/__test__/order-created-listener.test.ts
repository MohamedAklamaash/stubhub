import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { OrderCreatedEvent, OrderStatus } from "@sthubhub-aklamaash/common";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../OrderCreatedListener";
import { Order } from "../../../models/OrderModel";

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    expiresAt: "alskdjf",
    status: OrderStatus.Created,
    ticket: {
      id: "alskdfj",
      price: 10,
      name: "",
      quantity: 10,
      version: 0,
    },
    quantity: 2,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("replicates the order info", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id);

  expect(order!.price).toEqual(data.ticket.price);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
