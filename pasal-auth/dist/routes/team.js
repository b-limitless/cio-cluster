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
exports.teamRouter = void 0;
const common_1 = require("@pasal/common");
const logger_1 = __importDefault(require("@pasal/common/build/logger"));
const express_1 = __importDefault(require("express"));
const Team_body_request_1 = require("../body-request/Team.body-request");
const email_1 = require("../config/email");
const mailar_1 = require("../mailar");
const messages_1 = require("../messages");
const User_service_1 = require("../services/User.service");
const readFile_1 = require("../utils/readFile");
const utils_1 = require("./utils");
const router = express_1.default.Router();
exports.teamRouter = router;
router.post("/api/users/team", Team_body_request_1.TeamBodyRequest, common_1.validateRequest, common_1.requireAuth, common_1.hasPermissions(["create_team"]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, permissions, role, } = req.body;
    const existingUser = yield User_service_1.UserService.findOne(email);
    if (existingUser) {
        throw new common_1.BadRequestError(messages_1.messages.emailExists);
    }
    let selectedPermissionExists = yield utils_1.checkPermissionAllSet(permissions);
    if (!selectedPermissionExists.status) {
        throw new common_1.BadRequestError(`Error ${selectedPermissionExists.permissions}`);
    }
    const user = yield User_service_1.UserService.build({
        firstName,
        lastName,
        email,
        password,
        permissions,
        role,
        verified: true
    });
    res.status(201).send(user);
    try {
        const getWelcomeEmailTempalte = yield readFile_1.readFile("welcome-team.html", { firstName, email, password });
        const sendWelcomeEmail = yield mailar_1.sendMail({
            from: email_1.mailerEmail,
            to: email,
            subject: "Welcome to Customize.io - Your Account Has Been Created!",
            text: "",
            html: getWelcomeEmailTempalte,
        });
        logger_1.default.log("info", messages_1.messages.wcSent, sendWelcomeEmail);
    }
    catch (err) {
        logger_1.default.log("error", `${messages_1.messages.wcCanNotSent} ${err}`);
    }
}));
//# sourceMappingURL=team.js.map