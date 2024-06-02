import { Request, Response } from "express";

export const NewTicket = async (req: Request, res: Response) => {
    return res.status(200).json({ msg: "Akla" });
};
