import {
    Publisher,
    TicketUpdatedEvent,
    Subjects,
} from "@sthubhub-aklamaash/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}
