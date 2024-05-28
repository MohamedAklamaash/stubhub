import { Request, Response } from "express";
// checks if a user is currently logged in
export const currentUser = (req: Request, res: Response) => {
    return res.status(200).json({ currentUser: req.currentUser || null });
};
