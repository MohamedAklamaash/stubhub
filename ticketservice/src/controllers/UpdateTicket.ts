import { Request, Response } from "express";
import { Ticket } from "../models/ticketmodel";
import { NotfoundError, BadRequestError } from "@sthubhub-aklamaash/common";

export const UpdateTicket = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const ticket = await Ticket.findById(id);

        if (!ticket) {
            throw new NotfoundError();
        }
        Object.assign(ticket, req.body);
        await ticket.save();
        return res.status(200).json({ ticket });
    } catch (error) {
        throw new BadRequestError("Unable to find ticket");
    }
};
