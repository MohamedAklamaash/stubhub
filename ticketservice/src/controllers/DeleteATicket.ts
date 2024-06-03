import { Request, Response } from "express";
import { Ticket } from "../models/ticketmodel";
import { BadRequestError, NotfoundError } from "@sthubhub-aklamaash/common";
export const DeleteATicket = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            throw new NotfoundError();
        }
        await ticket.deleteOne();
        res.status(200).send({ message: "Ticket deleted successfully" });
    } catch (error) {
        throw new BadRequestError("Unable to find ticket");
    }
};
