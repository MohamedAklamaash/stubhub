import mongoose, { version } from "mongoose";
import { Order } from "./OrderModel";
import { OrderStatus } from "@sthubhub-aklamaash/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
interface TicketAttrs {
    id: string;
    name: string;
    price: number;
    description?: string;
    tags?: string[];
    imageUrl?: string;
    postedBy?: string;
    version?: number;
    quantity: number;
}

export interface TicketDoc extends mongoose.Document {
    name: string;
    // id: string; incoming id vantu doc lah iruka koodathu
    price: number;
    description?: string;
    tags?: string[];
    imageUrl?: string;
    postedBy?: string;
    quantity: number;
    version: number;
    isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketAttrs> {
    build(attrs: TicketAttrs): Promise<TicketDoc>;
    findByEvent({
        id,
        version,
    }: {
        id: string;
        version: number;
    }): Promise<TicketDoc | null>;
}

const TicketSchema = new mongoose.Schema(
    {
        id: {
            type: String,
        },
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
        // version: {
        //     type: Number,
        // },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret._id = ret.id;
                delete ret._id;
            },
        },
    }
);

TicketSchema.set("versionKey", "version");
TicketSchema.plugin(updateIfCurrentPlugin);

TicketSchema.statics.build = async (attrs: TicketAttrs) => {
    const ticket = new Ticket({
        name: attrs.name,
        price: attrs.price,
        description: attrs.description,
        tags: attrs.tags,
        imageUrl: attrs.imageUrl,
        postedBy: attrs.postedBy,
        version: attrs.version,
        quantity: attrs.quantity,
    });
    ticket._id = attrs.id as unknown as mongoose.Types.ObjectId;
    ticket.version = attrs.version;
    await ticket.save();

    return ticket;
};

TicketSchema.statics.findByEvent = async (event: {
    id: string;
    version: number;
}) => {
    const ticket = await Ticket.findOne({
        id: event.id,
        version: event.version - 1,
    });
    return ticket;
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
