import {
    BadRequestError,
    NotfoundError,
    OrderStatus,
} from "@sthubhub-aklamaash/common";
import { Request, Response } from "express";
import { Ticket, TicketDoc } from "../models/TicketModel";
import { Order } from "../models/OrderModel";
import { OrderCreatedPublisher } from "../events/publishers/OrderCreatedPublisher";
import { natsWrapper } from "../nats-wrapper";
import { version } from "mongoose";

export const createAnOrder = async (req: Request, res: Response) => {
    try {
        if (!req.currentUser || !req.currentUser.id) {
            throw new BadRequestError("Current User not found");
        }
        // quantity for order of tickets
        const { ticketId, quantity } = req.body;
        const ticketDoc = await Ticket.findById(ticketId);
        if (quantity <= 0) {
            throw new BadRequestError(
                "Cannot purchase ticket more than the quantity less than or equal to 0."
            );
        }
        if (!ticketDoc) {
            throw new NotfoundError();
        }

        // Assert the type to TicketDoc to access instance methods
        const ticket = ticketDoc as TicketDoc;

        if (ticket.quantity < 0) {
            throw new BadRequestError(
                "Cannot purchase ticket more than the quantity as 0."
            );
        }
        //need to write a listener here after updating ticket
        await ticket.save();

        const isReserved = await ticket.isReserved();

        if (isReserved) {
            throw new BadRequestError("Ticket already reserved");
        }

        const expiration = new Date();
        const EXPIRATION_WINDOW_SECONDS = 15 * 60;
        expiration.setSeconds(
            expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS
        );

        // Convert the expiration date to an ISO string
        const expiresAtString = expiration.toISOString();
        const order = Order.build({
            userId: req.currentUser.id,
            status: OrderStatus.Created,
            expiresAt: expiresAtString,
            ticket,
            quantity,
        });
        // publish an order:created after order
        await order.save();
        new OrderCreatedPublisher(natsWrapper.client).publish({
            id: order.id,
            expiresAt: expiresAtString,
            quantity,
            version: order.version,
            status: OrderStatus.Created,
            ticket: {
                id: ticket.id,
                name: ticket.name,
                postedBy: req.currentUser.id,
                price: ticket.price,
                description: ticket.description,
                imageUrl: ticket.imageUrl,
                quantity: ticket.quantity,
                tags: ticket.tags,
                version: ticket.version, // might be wrong,check it later
            },
        });
        res.status(201).json({ order });
    } catch (error) {
        throw new BadRequestError("Ticket already reserved");
    }
};
