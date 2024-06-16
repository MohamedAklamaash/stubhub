import {
    Listener,
    Subjects,
    OrderCreatedEvent,
} from "@sthubhub-aklamaash/common";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/OrderModel";
export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(
        data: OrderCreatedEvent["data"],
        msg: Message
    ): Promise<void> {
        const order = Order.build({
            id: data.id,
            version: data.version,
            price: data.ticket.price,
            quantity: data.quantity,
            status: data.status,
            userId: data.ticket.postedBy ?? "",
        });
        await order.save();
        console.log("Order created in payments service:",order);
        
        msg.ack();
    }
}
