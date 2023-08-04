import { BadRequestError, requireAuth, validateRequest } from "@pasal/common";
import logger from "@pasal/common/build/logger";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserBodyRequest } from "../body-request/User.body-request";
import { sendMail } from "../mailar";
import { UserService } from "../services/User.service";
import { checkPermissionAllSet } from "./utils";
import { mailerEmail } from "../config/email";
import { generateUniqueNumber } from "../functions/generateUniqueNumber";
import { messages } from "../messages";
import { VerficationService } from "../services/Verification.service";
import { readFile } from "../utils/readFile";
import { UserProfileBodyRequest } from "../body-request/UserProfile.body-request";

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

export { router as userRouter };
