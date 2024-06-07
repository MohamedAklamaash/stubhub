import {
    Publisher,
    OrderCancelledEvent,
    Subjects,
} from "@sthubhub-aklamaash/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}
