import { Subjects } from "./subjects";
// 
export interface UserVerifiedEvent {
  exchange?: string;
  subject: Subjects.UserVerified;
  data: {
    userId: string;
  };
}
