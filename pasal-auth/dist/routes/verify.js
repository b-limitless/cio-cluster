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
exports.verificationRouter = void 0;
const verification_1 = require("../models/verification");
const express_1 = require("express");
const Verification_body_request_1 = require("../body-request/Verification.body-request");
const common_1 = require("@pasal/common");
const user_1 = require("../models/user");
const logger_1 = __importDefault(require("../logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_verified_publisher_1 = require("../events/publishers/user-verified-publisher");
const router = express_1.Router();
exports.verificationRouter = router;
router.post("/api/users/verify", Verification_body_request_1.VerificationBodyRequest, common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { verificationCode } = req.body;
    const getVerficationCode = yield verification_1.Verification.findOne({ verificationCode });
    if (!getVerficationCode) {
        throw new common_1.NotFoundError("Unable to find verification code");
    }
    const { userId } = getVerficationCode;
    try {
        const user = yield user_1.User.findByIdAndUpdate(userId, { verified: true }, { new: true });
        if (!user) {
            throw new common_1.NotFoundError("Unable find the user");
        }
        const userJWT = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            permissions: user.permissions,
            role: user.role,
        }, process.env.JWT_KEY);
        req.session = {
            jwt: userJWT,
        };
        try {
            new user_verified_publisher_1.UserVerifiedPublisher(common_1.rabbitMQWrapper.client).publish({
                userId: user.id
            });
            logger_1.default.log("info", `User verified event has been published`);
        }
        catch (err) {
            logger_1.default.log("error", "Could not pulish the verify user event");
        }
        logger_1.default.log("info", `User successfully verified`);
        res.send(user);
        return;
    }
    catch (err) {
        logger_1.default.log("error", "Unable to update the user ");
    }
    res.send({});
}));
//# sourceMappingURL=verify.js.map