import {
    ExpirationComplete,
    Listener,
    NotfoundError,
    OrderStatus,
    Subjects,
} from "@sthubhub-aklamaash/common";
import { queueGroupName } from "./queue-grp-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/OrderModel";
import { OrderCancelledPublisher } from "../publishers/OrderUpdatedevent";
import { natsWrapper } from "../../nats-wrapper";

// When the expiration window is completed,make sure that we cancel the order

// the listener of the expiration complete that is in the orders service can make changes to the quantity
// and make the order id null

export class ExpirationCompleteListener extends Listener<ExpirationComplete> {
    readonly subject = Subjects.ExpirationComplete;
    queueGroupName = queueGroupName;
    async onMessage(
        data: ExpirationComplete["data"],
        msg: Message
    ): Promise<void> {
        const order = await Order.findById(data.orderId).populate("ticket");
        if (!order) {
            throw new NotfoundError();
        }
        if (order.status !== OrderStatus.Complete) {
            order.set({ status: OrderStatus.Cancelled });
            await order.save();
            msg.ack();
            new OrderCancelledPublisher(natsWrapper.client).publish({
                id: order.id,
                version: order.version,
                ticket: {
                    id: order.ticket.id,
                    quantity: order.ticket.quantity,
                },
            });
        }
        msg.ack();
    }
}
