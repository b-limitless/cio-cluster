import {UserCreatedEvent, Listener, Subjects} from "@pasal/common";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
    async onMessage(data: UserCreatedEvent["data"], message:any) {
        // We will store this to database
        console.log(`Product service receives user created event with data`, data);
    }
}