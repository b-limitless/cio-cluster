import { BadRequestError, hasPermissions, requireAuth, validateRequest } from "@pasal/common";
import logger from "@pasal/common/build/logger";
import express, { Request, Response } from "express";
import { TeamBodyRequest } from "../body-request/Team.body-request";
import { mailerEmail } from "../config/email";
import { sendMail } from "../mailar";
import { messages } from "../messages";
import { UserService } from "../services/User.service";
import { readFile } from "../utils/readFile";
import { checkPermissionAllSet } from "./utils";

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

    const {id: adminId} = req.currentUser || {};

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
      role,
      verified:true, 
      adminId

    });

    res.status(201).send(user);

    try {
      const getWelcomeEmailTempalte = await readFile("welcome-team.html", {firstName, email, password});
  
      const sendWelcomeEmail = await sendMail({
        from: mailerEmail,
        to: email,
        subject: "Welcome to Customize.io - Your Account Has Been Created!",
        text: "",
        html: getWelcomeEmailTempalte,
      });
      logger.log("info", messages.wcSent, sendWelcomeEmail);
    } catch (err) {
      logger.log("error", `${messages.wcCanNotSent} ${err}`);
    }
  });

export { router as teamRouter };
