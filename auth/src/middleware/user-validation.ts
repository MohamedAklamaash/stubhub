import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/req-validation-err";
export const userValidation = [
    check("name").optional().isString().isLength({ min: 3, max: 30 }),
    check("email").isEmail().withMessage("Email must be valid"),
    check("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            "i"
        )
        .withMessage("Password must be between 4 and 20 characters"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        next();
    },
];
