import {ProductCreatedEvent, Listener, Subjects } from '@pasal/common';

export class ProductCreatedListener extends Listener< ProductCreatedEvent > {
    subject:Subjects.ProductCreated = Subjects.ProductCreated;
    async onMessage(data: ProductCreatedEvent['data'], message:any) {
         console.log(`Message reveived on ProductCreatedListener`);
         console.log(data);
    
    }
}