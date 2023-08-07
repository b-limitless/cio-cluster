import { UserVerifiedEvent, Listener, Subjects } from "@pasal/common";
import logger from "@pasal/common/build/logger";
import { UserService } from "../../servies/User.service";
import { User } from "../../models/user";

export class UserVerifiedListener extends Listener<UserVerifiedEvent> {
  subject: Subjects.UserVerified = Subjects.UserVerified;
  async onMessage(data: UserVerifiedEvent["data"], message: any) {
    const parseData = JSON.parse(data as any);
    const { userId } = parseData;

    try {
      const verifyUser = await UserService.findOneAndUpdate(
        { userId },
        { verified: true },
        { new: true }
      );
      logger.log("info", `User successfully verified ${verifyUser}`);
    } catch (err) {
      logger.log("error", `Can not verify the user ${err}`);
    }
  }
}
