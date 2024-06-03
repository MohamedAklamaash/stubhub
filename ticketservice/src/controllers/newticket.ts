import { Request, Response } from "express";
import { Ticket } from "../models/ticketmodel";
import { BadRequestError } from "@sthubhub-aklamaash/common";

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
        return res.status(201).json({ ticket });
    } catch (error) {
        throw new BadRequestError("Unable to create ticket");
    }
};
