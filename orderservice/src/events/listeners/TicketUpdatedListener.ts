import {
    Listener,
    TicketUpdatedEvent,
    Subjects,
    NotfoundError,
    BadRequestError,
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
        try {
            let ticket = await Ticket.findOne({
                id: data.id,
                version: data.version,
            });
            console.log(ticket);
            console.log(data.version);

            if (!ticket) {
                ticket = await Ticket.findOne({
                    id: data.id,
                    version: data.version - 1,
                });
                if (!ticket) {
                    throw new NotfoundError();
                }
            }
            const {
                price,
                quantity,
                name,
                description,
                imageUrl,
                tags,
                orderId,
                postedBy
            } = data;
            ticket.set({
                price,
                quantity,
                name,
                description,
                imageUrl,
                tags,
                orderId,
                postedBy
            });
            await ticket.save();
            msg.ack();
        } catch (error) {
            console.log(error);

            throw new BadRequestError(
                "Error in Updating Ticket Listener Version Error "
            );
        }
    }
}
