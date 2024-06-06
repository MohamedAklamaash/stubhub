import {
    Publisher,
    TicketCreatedEvent,
    Subjects,
} from "@sthubhub-aklamaash/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}
