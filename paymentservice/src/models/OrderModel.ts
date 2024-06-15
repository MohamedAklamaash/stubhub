import { OrderStatus } from "@sthubhub-aklamaash/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
interface OrderAttrs {
    id: string;
    status: OrderStatus;
    version: number;
    userId: string;
    quantity: number;
    price: number;
}

// order doc once again dont' need an id to be working around with cuz we provide the id for it
// version will be handled by mongoose update if current
interface OrderDoc extends mongoose.Document {
    status: OrderStatus;
    version: number;
    userId: string;
    quantity: number;
    price: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: [
                OrderStatus.AwaitingPayment,
                OrderStatus.Cancelled,
                OrderStatus.Complete,
                OrderStatus.Created,
            ],
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        price: {
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

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order({
        _id: attrs.id,
        price: attrs.price,
        quantity: attrs.quantity,
        status: attrs.status,
        userId: attrs.userId,
    });
};

export const Order = mongoose.model<OrderDoc, OrderModel>(
    "Orders",
    orderSchema
);
