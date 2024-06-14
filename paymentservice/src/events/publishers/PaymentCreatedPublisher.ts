import {
    Publisher,
    PaymentCreatedEvent,
    Subjects,
} from "@sthubhub-aklamaash/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentComplete;
}
