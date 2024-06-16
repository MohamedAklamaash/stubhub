import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { OrderStatus, OrderCancelledEvent } from "@sthubhub-aklamaash/common";
import { OrderCancelledListener } from "../OrderCancelledListener";
import { natsWrapper } from "../../../nats-wrapper";
import { Order } from "../../../models/OrderModel";

// Setup function to create a listener and a sample order
const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = await Order.create({
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    price: 10,
    userId: "asldkfj",
    version: 1,
    quantity: 2,
  });

  const data: OrderCancelledEvent["data"] = {
    id: order.id,
    version: 1,
    ticket: {
      id: "asldkfj",
      quantity: 2,
    },
  };

  // Mock message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, order };
};

it("updates the status of the order", async () => {
  const { listener, data, msg, order } = await setup();

  await listener.onMessage(data, msg);
  console.log("data:", data);

  const updatedOrder = await Order.findOne({ id: order.id });
  console.log("found order:", updatedOrder);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("does not call ack if the version is incorrect", async () => {
  const { listener, data, msg } = await setup();

  data.version = 10; // incorrect version number

  try {
    await listener.onMessage(data, msg);
  } catch (err) {}

  expect(msg.ack).not.toHaveBeenCalled();
});

it("throws an error if the order is not found", async () => {
  const { listener, data, msg } = await setup();

  // Remove the order to simulate order not found
  await Order.deleteMany({});

  try {
    await listener.onMessage(data, msg);
  } catch (err) {}

  expect(msg.ack).not.toHaveBeenCalled();
});
