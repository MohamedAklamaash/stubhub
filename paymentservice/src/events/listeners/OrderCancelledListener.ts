import {
  Listener,
  Subjects,
  OrderCancelledEvent,
  NotfoundError,
  OrderStatus,
  BadRequestError,
} from "@sthubhub-aklamaash/common";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/OrderModel";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
  async onMessage(
    data: OrderCancelledEvent["data"],
    msg: Message
  ): Promise<void> {
    try {
      let order = await Order.findOne({
        _id: data.id,
        version: data.version - 1,
      });
      const orders = await Order.find({});
      console.log(orders);

      console.log(data);

      if (!order) {
        order = await Order.findOne({
          id: data.id,
          version: data.version,
        });
        if (!order) {
          order = await Order.findOne({
            id: data.id,
            version: data.version - 2,
          });
          if (!order) {
            console.log("Order not Found");
            throw new NotfoundError();
          }
        }
      }
      if (order.status === OrderStatus.Complete) {
        throw new BadRequestError("Already paid");
      }
      order.set({ status: OrderStatus.Cancelled });
      await order.save();
      console.log("Order cancelled in payments service");

      msg.ack();
    } catch (error) {
      console.log(error);
      throw new BadRequestError("Error in listening to order cancelled event");
    }
  }
}
