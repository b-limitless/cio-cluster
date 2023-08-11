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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const body_parser_1 = require("body-parser");
const cookie_session_1 = __importDefault(require("cookie-session"));
const signin_1 = require("./routes/signin");
const signup_1 = require("./routes/signup");
const signout_1 = require("./routes/signout");
const permission_1 = require("./routes/permission");
const reset_password_1 = require("./routes/reset-password");
const common_1 = require("@pasal/common");
const current_user_1 = require("./routes/current-user");
const verify_1 = require("./routes/verify");
const kyc_1 = require("./routes/kyc");
const profile_1 = require("./routes/profile");
const team_1 = require("./routes/team");
const app = express_1.default();
exports.app = app;
app.set("trust proxy", true);
app.use(body_parser_1.json());
app.use(cookie_session_1.default({
    signed: false,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
}));
app.use(common_1.currentUser);
app.use(current_user_1.currentUserRouter);
app.use(signin_1.signInRouter);
app.use(signup_1.signupRouter);
app.use(signout_1.signoutRouter);
app.use(reset_password_1.resetPasswordRouter);
app.use(permission_1.permissionRouter);
app.use(verify_1.verificationRouter);
app.use(kyc_1.KYCRouter);
app.use(profile_1.profileRouter);
app.use(team_1.teamRouter);
app.all("*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    throw new common_1.NotFoundError("Route did not find");
}));
app.use(common_1.errorHandler);
//# sourceMappingURL=app.js.map