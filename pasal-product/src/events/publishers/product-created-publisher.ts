import {Subjects, ProductCreatedEvent, Publisher} from '@pasal/common';

export class ProductCreatedPublisher extends Publisher <ProductCreatedEvent> {
    subject: Subjects.ProductCreated = Subjects.ProductCreated;
}