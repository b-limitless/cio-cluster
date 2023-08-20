import { FebricDeletedEvent, Publisher, Subjects } from "@pasal/common";

export class FebricDeletedPublisher extends Publisher<FebricDeletedEvent> {
    subject: Subjects.FebricDeleted = Subjects.FebricDeleted;
}