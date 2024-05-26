import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/not-authorized";

export const requireAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError();
    }
    next();
};
