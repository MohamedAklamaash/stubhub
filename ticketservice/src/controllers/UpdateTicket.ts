import { Request, Response } from "express";
import { Ticket } from "../models/ticketmodel";
import { NotfoundError, BadRequestError } from "@sthubhub-aklamaash/common";
import { TicketUpdatedPublisher } from "../events/publishers/Ticket-updated";
import { natsWrapper } from "../nats-wrapper";
export const UpdateTicket = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const ticket = await Ticket.findById(id);

        if (!ticket) {
            throw new NotfoundError();
        }
        Object.assign(ticket, req.body);
        await ticket.save();
        await new TicketUpdatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            name: ticket.name,
            price: ticket.price,
            description: ticket.description,
            tags: ticket.tags,
            imageUrl: ticket.imageUrl,
            postedBy: ticket.postedBy,
            quantity: ticket.quantity,
        });
        return res.status(200).json({ ticket });
    } catch (error) {
        throw new BadRequestError("Unable to find ticket");
    }
};
