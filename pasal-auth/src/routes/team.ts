import { BadRequestError, hasPermissions, requireAuth, validateRequest } from "@pasal/common";
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
import { TeamBodyRequest } from "../body-request/Team.body-request";

const router = express.Router();

router.post(
  "/api/users/team",
  TeamBodyRequest,
  validateRequest,
  requireAuth,
  hasPermissions(["create_team"]),
  async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      email,
      password,
      permissions,
      role,
    } = req.body;
    // verified
    const existingUser = await UserService.findOne(email);

    if (existingUser) {
      throw new BadRequestError(messages.emailExists);
    }

    let selectedPermissionExists = await checkPermissionAllSet(permissions);

    if (!selectedPermissionExists.status) {
      throw new BadRequestError(
        `Error ${selectedPermissionExists.permissions}`
      );
    }

    const user = await UserService.build({
      firstName,
      lastName,
      email,
      password,
      permissions,
      role
    });

    res.send(user);

//     try {
//       const getWelcomeEmailTempalte = await readFile("welcome.html", {});
  
//       const sendWelcomeEmail = await sendMail({
//         from: mailerEmail,
//         to: email,
//         subject: "Welcome to Customize.io",
//         text: "",
//         html: getWelcomeEmailTempalte,
//       });
//       logger.log("info", messages.wcSent, sendWelcomeEmail);
//     } catch (err) {
//       logger.log("error", `${messages.wcCanNotSent} ${err}`);
//     }

//     try {
//       const getHTMLTemplate = await readFile("email-verification.signup.html", {
//         verificationCode,
//       });

//       const sendVerificationEmail = await sendMail({
//         from: mailerEmail,
//         to: email,
//         subject: messages.verifyEmail,
//         text: "",
//         html: getHTMLTemplate,
//       });
//       logger.log("info", sendVerificationEmail);
//     } catch (err) {
//       logger.log("error", err);
//     }
//   }

res.send({})
  });

export { router as teamRouter };
