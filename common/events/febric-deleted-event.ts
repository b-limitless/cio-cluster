import { Subjects } from "./subjects";

export interface FebricDeletedEvent {
    exchange?:string;
    subject: Subjects.FebricDeleted, 
    data: {
        febricId: string;
    }
}