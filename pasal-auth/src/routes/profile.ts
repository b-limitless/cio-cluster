import { BadRequestError, requireAuth, validateRequest } from "@pasal/common";
import logger from "@pasal/common/build/logger";
import express, { Request, Response } from "express";
import { UserProfileBodyRequest } from "../body-request/UserProfile.body-request";
import { UserService } from "../services/User.service";

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

    const id = process.env.NODE_ENV !== "test" ? req?.currentUser?.id : req.params.id;
    
    if(!id) {
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
    } catch(err) {
      logger.log("error", `An error occurred while processing your request. ${err}`);
      res.status(500).send({message: "An error occurred while processing your request."});
    }
    
  }
);

export { router as profileRouter };