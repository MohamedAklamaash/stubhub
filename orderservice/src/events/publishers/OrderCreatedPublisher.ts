import {
    Publisher,
    OrderCreatedEvent,
    Subjects,
} from "@sthubhub-aklamaash/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}
