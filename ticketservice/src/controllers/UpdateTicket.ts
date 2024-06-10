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
        console.log(ticket.orderId);

        if (ticket.orderId) {
            throw new BadRequestError(
                "Tickets' Already Reserved ,so no update can be done"
            );
        }
        ticket.set({ ...req.body });
        await ticket.save();
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
        });
        return res.status(200).json({ ticket });
    } catch (error) {
        throw new BadRequestError("Unable to find ticket");
    }
};
