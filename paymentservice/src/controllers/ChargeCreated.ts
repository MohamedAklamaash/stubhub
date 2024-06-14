import { Request, Response } from "express";
import { Order } from "../models/OrderModel";
import {
    BadRequestError,
    NotAuthorizedError,
    NotfoundError,
    OrderStatus,
} from "@sthubhub-aklamaash/common";
import { stripe } from "../service/stripe";
import { Payment, PaymentDoc } from "../models/PaymentModel";
import { PaymentCreatedPublisher } from "../events/publishers/PaymentCreatedPublisher";
import { natsWrapper } from "../nats-wrapper";

export const ChargeCreated = async (req: Request, res: Response) => {
    try {
        // token usually arrives from the client
        const { token, orderId } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            throw new NotfoundError();
        }
        if (order.userId !== req.currentUser?.id) {
            throw new NotAuthorizedError();
        }
        if (order.status === OrderStatus.Cancelled) {
            throw new BadRequestError("Order is cancelled by the user");
        }
        const charge = await stripe.paymentIntents.create({
            amount: order.price * order.quantity * 100, // usd accepts in cents not dollers
            currency: "usd",
            automatic_payment_methods: {
                // this allows us to use payment methods that are enabled in the stripe dashboard
                enabled: true,
            },
            description: `${order.id} is Paid`,
        });
        if (!charge) {
            throw new Error("Something Went Wrong with the payment! ");
        }
        const payment = await Payment.build({
            orderId,
            stripeId: charge.id,
        }); 
        await payment.save();
        new PaymentCreatedPublisher(natsWrapper.client).publish({
            orderId,
            paymentId: payment.id,
            stripeId: charge.id,
        });
        // token: tok_visa --> this token is always valid as per the stripe
        return res.status(201).json({ success: true, payment });
    } catch (error) {}
};
