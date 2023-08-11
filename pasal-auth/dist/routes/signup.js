"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRouter = void 0;
const common_1 = require("@pasal/common");
const logger_1 = __importDefault(require("@pasal/common/build/logger"));
const express_1 = __importDefault(require("express"));
const User_body_request_1 = require("../body-request/User.body-request");
const mailar_1 = require("../mailar");
const User_service_1 = require("../services/User.service");
const utils_1 = require("./utils");
const email_1 = require("../config/email");
const generateUniqueNumber_1 = require("../functions/generateUniqueNumber");
const messages_1 = require("../messages");
const Verification_service_1 = require("../services/Verification.service");
const readFile_1 = require("../utils/readFile");
const user_created_publisher_1 = require("../events/publishers/user-created-publisher");
const router = express_1.default.Router();
exports.signupRouter = router;
router.post("/api/users/signup", User_body_request_1.UserBodyRequest, common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, permissions, role, } = req.body;
    const existingUser = yield User_service_1.UserService.findOne(email);
    if (existingUser) {
        throw new common_1.BadRequestError(messages_1.messages.emailExists);
    }
    let selectedPermissionExists = yield utils_1.checkPermissionAllSet(permissions);
    if (!selectedPermissionExists.status) {
        throw new common_1.BadRequestError(`Error ${selectedPermissionExists.permissions}`);
    }
    const user = yield User_service_1.UserService.build({
        email,
        password,
        permissions,
        role
    });
    const verificationCode = generateUniqueNumber_1.generateUniqueNumber();
    yield Verification_service_1.VerficationService.build({ userId: user.id, verificationCode });
    res.status(201).send({ user, verificationCode });
    try {
        new user_created_publisher_1.UserCreatedPublisher(common_1.rabbitMQWrapper.client).publish({
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
            verified: false
        });
        logger_1.default.log("info", "User created event has been published");
    }
    catch (err) {
        logger_1.default.log("error", `Could not publish user created event ${err}`);
    }
    try {
        const getWelcomeEmailTempalte = yield readFile_1.readFile("welcome.html", {});
        const sendWelcomeEmail = yield mailar_1.sendMail({
            from: email_1.mailerEmail,
            to: email,
            subject: "Welcome to Customize.io",
            text: "",
            html: getWelcomeEmailTempalte,
        });
        logger_1.default.log("info", messages_1.messages.wcSent, sendWelcomeEmail);
    }
    catch (err) {
        logger_1.default.log("error", `${messages_1.messages.wcCanNotSent} ${err}`);
    }
    try {
        const getHTMLTemplate = yield readFile_1.readFile("email-verification.signup.html", {
            verificationCode,
        });
        const sendVerificationEmail = yield mailar_1.sendMail({
            from: email_1.mailerEmail,
            to: email,
            subject: messages_1.messages.verifyEmail,
            text: "",
            html: getHTMLTemplate,
        });
        logger_1.default.log("info", sendVerificationEmail);
    }
    catch (err) {
        logger_1.default.log("error", err);
    }
}));
//# sourceMappingURL=signup.js.map