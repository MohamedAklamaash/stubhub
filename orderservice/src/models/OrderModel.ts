import mongoose from "mongoose";
import { OrderStatus } from "@sthubhub-aklamaash/common";
import { TicketDoc } from "./TicketModel";

interface OrderAttrs {
    userId: string;
    status: OrderStatus;
    quantity: number;
    expiresAt: string;
    ticket: TicketDoc;
}

interface OrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    quantity: number;
    expiresAt: string;
    ticket: TicketDoc;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: Object.values(OrderStatus),
            default: OrderStatus.Created,
        },
        quantity: {
            type: Number,
            required: true,
        },
        expiresAt: {
            type: mongoose.Schema.Types.Date,
        },
        ticket: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket", // Ensure this matches Ticket model name
        },
    },
    {
        toJSON: {
            transform(ret, doc) {
                ret.id = ret._id;
                delete (ret as any)._id;
            },
        },
    }
);

OrderSchema.statics.build = (attrs: OrderAttrs) => {
    // Converted Date object to ISO string
    const expiresAt = new Date(attrs.expiresAt).toISOString();

    return new Order({
        ...attrs,
        expiresAt,  
    });
};

export const Order = mongoose.model<OrderDoc, OrderModel>("Order", OrderSchema);
