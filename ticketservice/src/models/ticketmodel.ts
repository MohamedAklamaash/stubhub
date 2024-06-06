import mongoose from "mongoose";

interface ticketDoc extends mongoose.Document {
    name: string;
    price: number;
    description: string;
    tags: string[];
    imageUrl: string;
    postedBy: string;
    quantity: number;
}

const ticketSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
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

export const Ticket = mongoose.model<ticketDoc>("ticket", ticketSchema);
