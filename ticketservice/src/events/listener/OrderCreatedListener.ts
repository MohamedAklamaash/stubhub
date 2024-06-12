import {
    Listener,
    Subjects,
    OrderCreatedEvent,
    OrderStatus,
    NotfoundError,
} from "@sthubhub-aklamaash/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queryName";
import { Ticket } from "../../models/ticketmodel";
import { natsWrapper } from "../../nats-wrapper";
import { TicketUpdatedPublisher } from "../publishers/Ticket-updated";
export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
        /*  
        we will listen to the order created,
        take the quantity and subtract the quantity from the ticket model
        suppose when order is cancelled,then we will pass the quantity from orders model to tickets model
        and add the ticket models quantity with the orders quantity
        make sure to publish ticket updated event cuz since we are using mongoose update if current,there will be a version
        confict when we just update and not send it to the listeners
        */

        const ticket = await Ticket.findById(data.ticket.id);

        if (!ticket) {
            const data1 = await Ticket.find({});

            return new NotfoundError();
        }

        const quantity = ticket.quantity - data.quantity;
        ticket.set({ orderId: data.id, quantity });
        await ticket.save();

        msg.ack();
        new TicketUpdatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            name: ticket.name,
            price: ticket.price,
            description: ticket.description,
            tags: ticket.tags,
            imageUrl: ticket.imageUrl,
            postedBy: ticket.postedBy as string,
            quantity: ticket.quantity,
            version: ticket.version,
            orderId: data.id as string,
        });
    }
}
