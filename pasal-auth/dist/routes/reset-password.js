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
exports.resetPasswordRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const common_1 = require("@pasal/common");
const user_1 = require("../models/user");
const resetpassword_1 = require("../models/resetpassword");
const mongoose_1 = __importDefault(require("mongoose"));
const password_1 = require("../utils/password");
const router = express_1.default.Router();
exports.resetPasswordRouter = router;
router.post("/api/users/request_reset_password", [express_validator_1.body("email").isEmail().withMessage("Please provide email address")], common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield user_1.User.findOne({ email });
    if (!user) {
        throw new common_1.BadRequestError(`Can not find the user with email ${email}`);
    }
    const resetPassword = resetpassword_1.ResetPassword.build({
        user_id: user.id,
        code: new mongoose_1.default.mongo.ObjectId().toHexString(),
    });
    res.status(201).json(resetPassword);
}));
router.post("/api/users/updated_password", [
    express_validator_1.body("code")
        .isLength({ min: 24, max: 24 })
        .withMessage("Please provide valid id"),
    express_validator_1.body("user_id")
        .isLength({ min: 24, max: 24 })
        .withMessage("Please provide valid id"),
    express_validator_1.body("password")
        .isLength({ min: 4, max: 28 })
        .withMessage("Please enter the password")
        .custom((value, { req, path }) => {
        if (value !== req.body.confirmPassword) {
            throw new common_1.BadRequestError("Both password did not match");
        }
        else {
            return true;
        }
    }),
], common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, user_id, password } = req.body;
    const isValid = yield resetpassword_1.ResetPassword.findOne({
        user_id: user_id,
        code: code,
        expire_at: { $lt: new Date() },
    });
    if (isValid) {
        throw new common_1.BadRequestError(`Invalid code or code has been expired`);
    }
    const user = yield user_1.User.findById(user_id);
    if (!user) {
        throw new common_1.BadRequestError("Unable find the user");
    }
    const hashedPassword = yield password_1.Password.toHash(password);
    try {
        const updatePassword = yield user_1.User.findOneAndUpdate({ _id: user_id }, { $set: { password: hashedPassword } }, { new: true, useFindAndModify: false });
        if (!updatePassword) {
            throw new Error(`Unable to update the password`);
        }
        return res.status(204).json({ message: "Password updated sucessfully" });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}));
//# sourceMappingURL=reset-password.js.map