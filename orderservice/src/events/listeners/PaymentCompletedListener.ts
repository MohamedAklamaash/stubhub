import {
    BadRequestError,
    Listener,
    OrderStatus,
    PaymentCreatedEvent,
    Subjects,
} from "@sthubhub-aklamaash/common";
import { queueGroupName } from "./queue-grp-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/OrderModel";

export class PaymentCompletedListener extends Listener<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentComplete;
    queueGroupName = queueGroupName;
    async onMessage(
        data: PaymentCreatedEvent["data"],
        msg: Message
    ): Promise<void> {
        const order = await Order.findById(data.orderId);
        if (!order) {
            throw new BadRequestError(
                "Trying to pay for a order that hasnt' been placed "
            );
        }
        order.set({ status: OrderStatus.Complete });
        await order.save();
        msg.ack();
    }
}
