import { Request, Response } from "express";
import { Ticket } from "../models/ticketmodel";
import { BadRequestError, NotfoundError } from "@sthubhub-aklamaash/common";

export const GetDetailsAboutATicket = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            throw new NotfoundError();
        }
        return res.status(200).json({ ticket });
    } catch (error) {
        throw new BadRequestError("Ticket Not Found");

    }
};
