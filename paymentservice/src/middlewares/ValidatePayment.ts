import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

export const PaymentsValidator = [
    check("token").not().isEmpty().withMessage("Token is not provided"),
    check("orderId").not().isEmpty().withMessage("Order id is not provided"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new Error("Invalid credentials provided");
        }
        next();
    },
];
