import { Message } from "node-nats-streaming";
import {
    Subjects,
    TicketCreatedEvent,
    Listener,
} from "@sthubhub-aklamaash/common";
import { Ticket } from "../../models/TicketModel";
import { queueGroupName } from "./queue-grp-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName = queueGroupName;
    async onMessage(
        data: TicketCreatedEvent["data"],
        msg: Message
    ): Promise<void> {
        const ticket = await Ticket.create(data);
        await ticket.save();
        console.log(ticket);
        
        msg.ack();
    }
}
