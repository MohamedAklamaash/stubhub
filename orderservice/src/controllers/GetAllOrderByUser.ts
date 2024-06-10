import { BadRequestError } from "@sthubhub-aklamaash/common";
import { Request, Response } from "express";
import { Order } from "../models/OrderModel";

export const GetAllOrdersByUser = async (req: Request, res: Response) => {
    try {
        if (!req.currentUser || !req.currentUser.id) {
            throw new BadRequestError("Current User not found");
        }

        // Await the result of the query
        const orders = await Order.find({ userId: req.currentUser.id }).populate("ticket");

        // Send the orders in the response
        return res.status(200).json({ orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        // Send a generic error message
        res.status(500).json({ error: "Something went wrong" });
    }
};
