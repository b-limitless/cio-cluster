import { Subjects } from "./subjects";
import mongoose from "mongoose";

export interface FebricUpdatedEvent {
  exchange?: string;
  subject: Subjects.FebricUpdated;
  data: {
    febricId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    title: string;
    price: number;
    deliveryTime: string;
    excellence: string;
    warmth: string;
    weight: string;
    season: string;
    threadStyle: string;
    brightness: string;
    superShiny: boolean;
    material: string;
    tone: string;
    threadCount: number;
    opacity: string;
    waterproof: boolean;
    stretchyText: string;
    stretchy: boolean;
    mis: string;
    type: string;
    febricTypes: string;
    febricSeasons: string;
    threadTypes: string;
    threadCounts: string;
    characters: string[];
    thumbnailImageUrl: string;
    originalImageUrl: string;
  };
}
