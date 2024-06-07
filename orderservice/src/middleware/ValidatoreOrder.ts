import { check, validationResult } from "express-validator";
import mongoose from "mongoose";
import {} from "@sthubhub-aklamaash/common";
import { NextFunction, Request, Response } from "express";
export const ValidateOrder = [
    check("ticketId")
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .not()
        .isEmpty()
        .withMessage("Ticket Id must be provided"),
    (req: Request, res: Response, next: NextFunction) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            throw new Error("Validation Error");
        }
        next();
    },
];
