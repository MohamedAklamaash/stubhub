import {
    Listener,
    TicketUpdatedEvent,
    Subjects,
    NotfoundError,
} from "@sthubhub-aklamaash/common";
import { Ticket } from "../../models/TicketModel";
import { queueGroupName } from "./queue-grp-name";
import { Message } from "node-nats-streaming";
export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
    queueGroupName = queueGroupName;
    async onMessage(
        data: TicketUpdatedEvent["data"],
        msg: Message
    ): Promise<void> {
        const ticket = await Ticket.findById(data.id);
        if (!ticket) {
            throw new NotfoundError();
        }
        Object.assign(ticket, data);
        await ticket.save();
        msg.ack();
    }
}
