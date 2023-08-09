import { UserCreatedEvent, Listener, Subjects } from "@pasal/common";
import logger from "@pasal/common/build/logger";
import { UserService } from "../../servies/User.service";
import { Channel } from "amqplib";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;

  async onMessage(data: UserCreatedEvent["data"], message: any) {
    // We will store this to database
    try {
      await UserService.build(JSON.parse(data as any));
      logger.log(
        "info",
        `User has been successfully added to product service ${data}`
      );
    } catch (err: any) {
      logger.log("error", err);
      throw new Error(err);
    }
  }
}
