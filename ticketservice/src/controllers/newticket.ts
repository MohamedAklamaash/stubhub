import { Request, Response } from "express";
import { Ticket } from "../models/ticketmodel";
import { BadRequestError } from "@sthubhub-aklamaash/common";
import { TicketCreatedPublisher } from "../events/publishers/TicketCreatedPublisher";
import { natsWrapper } from "../nats-wrapper";
export const NewTicket = async (req: Request, res: Response) => {
    try {
        // req.currentUser's availablity is checked in the middleware
        const ticket = await Ticket.create({
            ...req.body,
        });
        if (!req.currentUser?.id || !req.currentUser) {
            throw new BadRequestError("Current User Not Found");
        }
        ticket.postedBy = req.currentUser.id;
        if (ticket.quantity === 0) {
            throw new BadRequestError(
                "Unable to create ticket with quantity 0"
            );
        }
        await ticket.save();
        new TicketCreatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            name: ticket.name,
            price: ticket.price,
            description: ticket.description,
            tags: ticket.tags,
            imageUrl: ticket.imageUrl,
            postedBy: ticket.postedBy,
            quantity: ticket.quantity,
        });

        return res.status(201).json({ ticket });
    } catch (error) {
        throw new BadRequestError("Unable to create ticket");
    }
};
