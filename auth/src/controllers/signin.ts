import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { BadRequestError } from "../errors/user-already-exists";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            throw new BadRequestError("User not found");
        }

        const doesPassMatch = await Password.compare(existingUser.password, password);

        if (!doesPassMatch) {
            throw new BadRequestError("Invalid credentials");
        }

        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email,
            },
            process.env.JWT_KEY!
        );

        req.session = {
            jwt: userJwt,
        };

        return res.status(200).json({ user: existingUser });
    } catch (error) {
        next(error);
    }
};