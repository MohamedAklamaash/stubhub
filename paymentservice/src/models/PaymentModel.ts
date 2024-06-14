import mongoose from "mongoose";

interface PaymentAttrs {
    orderId: string;
    stripeId: string;
}

export interface PaymentDoc extends mongoose.Document {
    orderId: string;
    stripeId: string;
}

interface PaymentModel extends mongoose.Model<PaymentDoc> {
    build(attrs: PaymentAttrs): Promise<PaymentDoc>;
}

const PaymentSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
        },
        stripeId: {
            type: String,
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

PaymentSchema.statics.build = async (
    attrs: PaymentAttrs
): Promise<PaymentDoc> => {
    const payment = new Payment({
        orderId: attrs.orderId,
        stripeId: attrs.stripeId,
    });
    return payment;
};

export const Payment = mongoose.model<PaymentDoc, PaymentModel>(
    "Payments",
    PaymentSchema
);
