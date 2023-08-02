import { BadRequestError, validateRequest } from "@pasal/common";
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

const router = express.Router();

router.post(
  "/api/users/signup",
  UserBodyRequest,
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      email,
      password,
      permissions,
      role,
      industry,
      employeeCount,
      targetMarket,
      currentWorkFlow,
      currentSoftware,
      painPoint,
      requirements,
      tranningAndSupport,
    } = req.body;

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
      email,
      password,
      permissions,
      role,
      industry,
      employeeCount,
      targetMarket,
      currentWorkFlow,
      currentSoftware,
      painPoint,
      requirements,
      tranningAndSupport,
    });

    // Use a model to store the code for the verification
    // Generate the code using dedicated algorithm
    const verificationCode = generateUniqueNumber();
    await VerficationService.build({ userId: user.id, verificationCode });

    res.status(201).send({ user, verificationCode });

    try {
      const getWelcomeEmailTempalte = await readFile("welcome.html", {});
  
      const sendWelcomeEmail = await sendMail({
        from: mailerEmail,
        to: email,
        subject: "Welcome to Customize.io",
        text: "",
        html: getWelcomeEmailTempalte,
      });
      logger.log("info", messages.wcSent, sendWelcomeEmail);
    } catch (err) {
      logger.log("error", `${messages.wcCanNotSent} ${err}`);
    }

    try {
      const getHTMLTemplate = await readFile("email-verification.signup.html", {
        verificationCode,
      });

      const sendVerificationEmail = await sendMail({
        from: mailerEmail,
        to: email,
        subject: messages.verifyEmail,
        text: "",
        html: getHTMLTemplate,
      });
      logger.log("info", sendVerificationEmail);
    } catch (err) {
      logger.log("error", err);
    }
  }
);

export { router as signupRouter };
