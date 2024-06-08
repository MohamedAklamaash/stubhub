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
            console.log("Ticket Version:", data.version, "id:", data.id);

            const ticket = await Ticket.findOne({
                version: data.version - 1,
                id: data.id,
            });
            console.log("ticket found!,", ticket);

            if (!ticket) {
                throw new NotfoundError();
            }
            const { price, quantity, name, description, imageUrl, tags } = data;
            ticket.set({
                price,
                quantity,
                name,
                description,
                imageUrl,
                tags,
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
