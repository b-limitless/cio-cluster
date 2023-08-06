import {UserCreatedEvent, Listener, Subjects} from "@pasal/common";
import logger from "@pasal/common/build/logger";
import { User } from "../../models/user";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
    async onMessage(data: UserCreatedEvent["data"], message:any) {
        // We will store this to database
        
        try {
            await User.build(data);
            logger.log(`User has been successfully added to product service`, data);
        } catch (err:any) {
            logger.log("error", err);
            throw new Error(err);
        }
        
    }
}