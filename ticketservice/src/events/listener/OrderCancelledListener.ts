import {
    BadRequestError,
    Listener,
    OrderCancelledEvent,
    Subjects,
} from "@sthubhub-aklamaash/common";
import { queueGroupName } from "./queryName";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticketmodel";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id);

        console.log(data);

        if (!ticket) {
            throw new BadRequestError(
                "There might be an error while creating an order"
            );
        }
        let quantity = ticket.quantity;
        if (data.ticket.quantity) {
            quantity = ticket.quantity + data.ticket.quantity;
        }
        ticket.set({ orderId: undefined, quantity });

        await ticket.save();
        msg.ack();
    }
}
