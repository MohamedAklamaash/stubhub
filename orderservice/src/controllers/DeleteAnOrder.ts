import {
    BadRequestError,
    NotAuthorizedError,
    NotfoundError,
    OrderStatus,
} from "@sthubhub-aklamaash/common";
import { Request, Response } from "express";
import { Order } from "../models/OrderModel";
import { OrderCancelledPublisher } from "../events/publishers/OrderUpdatedevent";
import { natsWrapper } from "../nats-wrapper";

// just change the order status to cancelled
export const DeleteAnOrder = async (req: Request, res: Response) => {
    try {
        if (!req.currentUser || !req.currentUser.id) {
            throw new BadRequestError("Current User not found");
        }
        const { id } = req.params;
        const order = await Order.findById(id).populate("Ticket");
        if (order?.userId !== req.currentUser.id) {
            throw new NotAuthorizedError();
        }
        if (!order) {
            throw new NotfoundError();
        }
        order.status = OrderStatus.Cancelled;
        await order.save();
        new OrderCancelledPublisher(natsWrapper.client).publish({
            id: order.id,
            version: order.version,
            ticket: {
                id: order.ticket.id,
            }, // ticket reprs ticket id
        });
        return res.status(200).json({ order });
    } catch (error) {}
};
