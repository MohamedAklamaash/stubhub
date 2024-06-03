import { Request, Response } from "express";
import { Ticket } from "../models/ticketmodel";
import { NotfoundError } from "@sthubhub-aklamaash/common";

export const GetAllTickets = async (req: Request, res: Response) => {
    try {
        const tickets = await Ticket.find({});
        return res.status(200).json({ ticket: tickets });
    } catch (error) {
        throw new NotfoundError();
    }
};
