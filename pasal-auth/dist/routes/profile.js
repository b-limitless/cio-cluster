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
exports.profileRouter = void 0;
const common_1 = require("@pasal/common");
const logger_1 = __importDefault(require("@pasal/common/build/logger"));
const express_1 = __importDefault(require("express"));
const UserProfile_body_request_1 = require("../body-request/UserProfile.body-request");
const User_service_1 = require("../services/User.service");
const profile_updated_publisher_1 = require("../events/publishers/profile-updated-publisher");
const router = express_1.default.Router();
exports.profileRouter = router;
router.patch("/api/users/:id?", UserProfile_body_request_1.UserProfileBodyRequest, common_1.requireAuth, common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { firstName, lastName, country, spokenLanguage, about, profileImageLink, } = req.body;
    const id = process.env.NODE_ENV !== "test" ? (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a.id : req.params.id;
    if (!id) {
        throw new common_1.BadRequestError("No authenticated user found");
    }
    try {
        const findAndUpdate = yield User_service_1.UserService.findByIdAndUpdate(id, {
            firstName,
            lastName,
            country,
            spokenLanguage,
            about,
            profileImageLink,
        }, { new: true });
        res.send(findAndUpdate);
        try {
            new profile_updated_publisher_1.UserProfileUpdatedPublisher(common_1.rabbitMQWrapper.client).publish(findAndUpdate);
        }
        catch (err) {
            logger_1.default.log("error", "Could not publish profile updated event");
        }
    }
    catch (err) {
        logger_1.default.log("error", `An error occurred while processing your request. ${err}`);
        res.status(500).send({ message: "An error occurred while processing your request." });
    }
}));
//# sourceMappingURL=profile.js.map