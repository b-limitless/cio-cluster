import {Subjects} from './subjects';

export interface ProductCreatedEvent {
    exchange?:string;
    subject: Subjects.ProductCreated;
    data: {
        version: number,
        price: number,
        id: string,
        userId:string,
        name?:string;
        category?:string;
        subCategory?:string;
        availableItems?:string;
        mediaLinks?:string;
    }
}