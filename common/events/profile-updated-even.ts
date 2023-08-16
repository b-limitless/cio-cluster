import { Subjects } from "./subjects";

export interface ProfileUpdatedEvent {
  exchange?: string;
  subject: Subjects.ProfileUpdated;
  data: {
    userId: string;
    firstName: string | null;
    lastName: string | null;
    country: string | null;
    spokenLanguage: string[];
    about: string | null;
    profileImageLink: string | null;
  };
}

