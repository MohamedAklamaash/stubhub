import {
    Listener,
    OrderCreatedEvent,
    OrderStatus,
    Subjects,
} from "@sthubhub-aklamaash/common";
import { queueGroupName } from "./queueGropName";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(
        data: OrderCreatedEvent["data"],
        msg: Message
    ): Promise<void> {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log("Waiting this many milliseconds to process the job:",delay);
        
        await expirationQueue.add(
            { orderId: data.id },
            {
                delay,
            }
        ); // this invokes the job process after the delay
        msg.ack();
    }
}
