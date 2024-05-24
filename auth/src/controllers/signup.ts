import { Request, Response, NextFunction } from "express";
import { userDetails } from "../../types";
import { User } from "../models/user";
import { BadRequestError } from "../errors/user-already-exists";

export const signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password }: userDetails = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new BadRequestError("Email already in use");
        }
        // hashing of pass needs to be done
        const user = User.build({ email, password });
        await user.save();
        // need to send a jwt or cookie
        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
};
