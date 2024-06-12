/*
    enqueue a job into a queue
    send it to a worker server (i.e ... our redis here )
    process it back & emit that order timing is expired
*/

import Queue from "bull";
import { ExpirationCompletePublisher } from "../events/publishers/ExpirationCompletePublisher";
import { natsWrapper } from "../nats-wrapper";

interface Payload {
    orderId: string;
}

export const expirationQueue = new Queue<Payload>("order:expiration", {
    redis: {
        host: process.env.REDIS_HOST,
    },
});

// processing the job
expirationQueue.process(async (job) => {
    console.log("Sending expiration complete for order id:", job.data.orderId);
    new ExpirationCompletePublisher(natsWrapper.client).publish({
        orderId: job.data.orderId,
    });
});
