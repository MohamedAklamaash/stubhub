import { Message } from "node-nats-streaming";
import {
    Subjects,
    TicketCreatedEvent,
    Listener,
} from "@sthubhub-aklamaash/common";
import { Ticket } from "../../models/TicketModel";
import { queueGroupName } from "./queue-grp-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName = queueGroupName;
    onMessage(data: TicketCreatedEvent["data"], msg: Message):void {
        // id in ticket srv will not be equal to id in this orders srv
        const ticket = Ticket.build(data); // if not working then use build func ,send panra data lah id irukum cuz ticket is created in tickets service and then sent here
        msg.ack();
    }
    parseData(msg: Message) {}
    listen(): void {}
}
