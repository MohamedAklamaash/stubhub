import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current"; // gives us optimistic concurrency control

interface ticketDoc extends mongoose.Document {
    name: string;
    price: number;
    description: string;
    tags: string[];
    imageUrl: string;
    postedBy?: string;
    quantity: number;
    version: number;
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
ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

export const Ticket = mongoose.model<ticketDoc>("ticket", ticketSchema);
