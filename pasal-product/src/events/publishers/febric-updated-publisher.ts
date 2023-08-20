import { FebricUpdatedEvent, Publisher, Subjects } from "@pasal/common";

export class FebricUpdatedPublisher extends Publisher<FebricUpdatedEvent> {
    subject: Subjects.FebricUpdated = Subjects.FebricUpdated;
}