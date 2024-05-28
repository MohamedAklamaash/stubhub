import { Request, Response, NextFunction } from "express";
import { userDetails } from "../../types";
import { User } from "../models/user";
import { BadRequestError } from "../errors/user-already-exists";
import jwt from "jsonwebtoken";
export const signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, email, password }: userDetails = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new BadRequestError("Email already in use");
        }
        // hashing of pass needs to be done
        const user = User.build({ name, email, password });
        await user.save();
        //Generating a jwt and storing it in req.session

        const userJwt = jwt.sign(
            {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            process.env.JWT_KEY!
        );

        req.session = {
            jwt: userJwt,
        }; // jwt cuz it's tamper free

        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
};
