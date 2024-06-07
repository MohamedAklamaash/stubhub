import { BadRequestError } from "@sthubhub-aklamaash/common";
import { Request, Response } from "express";
import { Order } from "../models/OrderModel";

export const GetAllOrdersByUser = async (req: Request, res: Response) => {
    try {
        if (!req.currentUser || !req.currentUser.id) {
            throw new BadRequestError("Current User not found");
        }
        // .populate sends back all associated Tickets with the order
        const orders = Order.find({ userId: req.currentUser.id }).populate(
            "Ticket"
        );

        return res.status(200).json({ orders });
    } catch (error) {}
};
