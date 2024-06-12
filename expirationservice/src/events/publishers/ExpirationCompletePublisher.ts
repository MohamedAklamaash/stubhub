import {
    ExpirationComplete,
    Publisher,
    Subjects,
} from "@sthubhub-aklamaash/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationComplete> {
    readonly subject = Subjects.ExpirationComplete;
}
