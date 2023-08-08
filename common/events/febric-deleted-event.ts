import { Subjects } from "./subjects";
import mongoose from "mongoose";
export interface FebricDeletedEvent {
    exchange?:string;
    subject: Subjects.FebricDeleted, 
    data: {
        febricId: mongoose.Schema.Types.ObjectId;
    }
}