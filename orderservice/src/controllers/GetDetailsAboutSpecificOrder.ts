import {
    BadRequestError,
    NotAuthorizedError,
    NotfoundError,
} from "@sthubhub-aklamaash/common";
import { Request, Response } from "express";
import { Order } from "../models/OrderModel";

export const GetDetailsAboutSpecificOrder = async (
    req: Request,
    res: Response
) => {
    try {
        if (!req.currentUser || !req.currentUser.id) {
            throw new BadRequestError("Current User not found");
        }
        const { id } = req.params;
        const order = await Order.findById(id);
        if (order?.userId !== req.currentUser.id) {
            throw new NotAuthorizedError();
        }
        if (!order) {
            throw new NotfoundError();
        }
        return res.status(200).json({ order });
    } catch (error) {}
};
