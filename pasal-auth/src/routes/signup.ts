import { BadRequestError, rabbitMQWrapper, validateRequest } from "@pasal/common";
import logger from "@pasal/common/build/logger";
import express, { Request, Response } from "express";
import { Password } from "../../src/utils/password";
import { UserBodyRequest } from "../body-request/User.body-request";
import { mailerEmail } from "../config/email";
import { UserCreatedPublisher } from "../events/publishers/user-created-publisher";
import { generateUniqueNumber } from "../functions/generateUniqueNumber";
import { sendMail } from "../mailar";
import { messages } from "../messages";
import { UserService } from "../services/User.service";
import { VerficationService } from "../services/Verification.service";
import { readFile } from "../utils/readFile";
import { checkPermissionAllSet } from "./utils";

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

    // Build a password
    const hasPassword = await Password.toHash(password);

    const user = await UserService.build({
      email,
      password:hasPassword,
      permissions,
      role
    });

    // Use a model to store the code for the verification
    // Generate the code using dedicated algorithm
    const verificationCode = generateUniqueNumber();
    await VerficationService.build({ userId: user.id, verificationCode });

    res.status(201).send({ user, verificationCode });

    // Publish the event 
    try {
      new UserCreatedPublisher(rabbitMQWrapper.client).publish({
        userId: user.id,
        email,
        password,
        permissions,
        role,
        firstName: null,
        lastName: null,
        country: null,
        spokenLanguage: [],
        about: null,
        profileImageLink: null,
        verified:false
      });
      logger.log("info", "User created event has been published");
    } catch(err) {
      logger.log("error", `Could not publish user created event ${err}`)
    }

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
