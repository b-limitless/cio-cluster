import {
  BadRequestError,
  rabbitMQWrapper,
  requireAuth,
  validateRequest,
} from "@pasal/common";
import logger from "@pasal/common/build/logger";
import express, { Request, Response } from "express";
import { UserProfileBodyRequest } from "../body-request/UserProfile.body-request";
import { UserService } from "../services/User.service";
import { UserProfileUpdatedPublisher } from "../events/publishers/profile-updated-publisher";

const router = express.Router();

router.patch(
  "/api/users/:id?",
  UserProfileBodyRequest,
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      country,
      spokenLanguage,
      about,
      profileImageLink,
    } = req.body;

    const id =
      process.env.NODE_ENV !== "test" ? req?.currentUser?.id : req.params.id;

    if (!id) {
      throw new BadRequestError("No authenticated user found");
    }

    try {
      const findAndUpdate = await UserService.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          country,
          spokenLanguage,
          about,
          profileImageLink,
        },
        { new: true }
      );
      res.send(findAndUpdate);
      // Pulish the event that profile is updated

      try {
        new UserProfileUpdatedPublisher(rabbitMQWrapper.client).publish({
          userId: id,
          firstName,
          lastName,
          country,
          spokenLanguage,
          about,
          profileImageLink,
        });
      } catch (err) {
        logger.log("error", "Could not publish profile updated event");
      }
    } catch (err) {
      logger.log(
        "error",
        `An error occurred while processing your request. ${err}`
      );
      res
        .status(500)
        .send({ message: "An error occurred while processing your request." });
    }
  }
);

export { router as profileRouter };
