import { Listener, ProfileUpdatedEvent, Subjects } from "@pasal/common";
import logger from "@pasal/common/build/logger";
import { UserService } from "../../services/User.service";

export class ProfileUpdatedListener extends Listener<ProfileUpdatedEvent> {
  subject: Subjects.ProfileUpdated = Subjects.ProfileUpdated;
  async onMessage(data: ProfileUpdatedEvent["data"], message: any) {
    const parseData = JSON.parse(data as any);
    const { id:userId, ...rest } = parseData;

    try {
      const updateUserProfile = await UserService.findOneAndUpdate(
        { userId },
        { ...rest },
        { new: true }
      );
      
      logger.log("info", "User profile has been successfully updated.");
      logger.log("info", updateUserProfile)
    } catch (err) {
      logger.log("error", `Could not updated the profile ${err}`);
    }
  }
}
