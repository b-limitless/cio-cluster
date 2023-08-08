import { Subjects } from "./subjects";

//
export interface UserCreatedEvent {
  exchange?: string;
  subject: Subjects.UserCreated;
  data: {
    userId: string;
    email: string;
    password: string;
    role: string;
    permissions: string[];
    firstName: string | null;
    lastName: string | null;
    country: string | null;
    spokenLanguage: string[];
    about: string | null;
    profileImageLink: string | null;
    verified:boolean
  };
}
