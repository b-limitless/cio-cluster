import { Subjects, Publisher, FebricCreatedEvent } from "@pasal/common";

export class FebricCreatedPublisher extends Publisher<FebricCreatedEvent> {
  subject: Subjects.FebricCreated = Subjects.FebricCreated;
}
