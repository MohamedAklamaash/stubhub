import mongoose from "mongoose";
import { Order } from "./OrderModel";
import { OrderStatus } from "@sthubhub-aklamaash/common";

interface TicketAttrs {
    id: string;
    name: string;
    price: number;
    description?: string;
    tags?: string[];
    imageUrl?: string;
    postedBy?: string;
    quantity: number;
}

export interface TicketDoc extends mongoose.Document {
    name: string;
    price: number;
    description?: string;
    tags?: string[];
    imageUrl?: string;
    postedBy?: string;
    quantity: number;
    isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketAttrs> {
    build(attrs: TicketAttrs): void;
}

const TicketSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        description: {
            type: String,
            default: "",
        },
        tags: {
            type: [String],
            default: [],
        },
        imageUrl: {
            type: String,
            default: "",
        },
        postedBy: {
            // this stores the id of the user that posted the ticket
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

TicketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket({
        _id: attrs.id,
        name: attrs.name,
        price: attrs.price,
        description: attrs.description,
        tags: attrs.tags,
        imageUrl: attrs.imageUrl,
        postedBy: attrs.postedBy,
        quantity: attrs.quantity,
    });
};

//methods are associated with the doc of the model
TicketSchema.methods.isReserved = async function () {
    const order = await Order.findOne({
        ticket: this,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete,
            ],
        },
    });
    return !!order;
};

export const Ticket = mongoose.model<TicketDoc, TicketModel>(
    "Ticket",
    TicketSchema
);
