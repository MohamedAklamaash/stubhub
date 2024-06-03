import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { RequestValidationError } from "@sthubhub-aklamaash/common";
export const TicketValidator = [
    check("name")
        .isString()
        .isLength({ min: 4, max: 30 })
        .withMessage("Ticket Name should be between 4 and 30 characters"),
    check("price")
        .isNumeric()
        .withMessage("Price must be a numeric value")
        .isFloat({ gt: 0 })
        .withMessage("Price must be greater than 0"),
    check("quantity")
        .isNumeric()
        .withMessage("Quantity must be a numeric value")
        .isInt({ gt: 0 })
        .withMessage("Quantity must be greater than 0"),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        next();
    },
];
