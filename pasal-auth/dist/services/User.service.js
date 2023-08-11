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
exports.UserService = exports.UserServiceLocal = void 0;
const logger_1 = __importDefault(require("../logger"));
const user_1 = require("../models/user");
class UserServiceLocal {
    findOne(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield user_1.User.findOne({ email });
            return existingUser;
        });
    }
    build(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = user_1.User.build(Object.assign({}, data));
                yield user.save();
                return user;
            }
            catch (err) {
                logger_1.default.log("error", `Could not save user: ${err}`);
                throw new Error(err);
            }
        });
    }
    findByIdAndUpdate(id, update, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield user_1.User.findByIdAndUpdate(id, update, options);
                return updated;
            }
            catch (err) {
                logger_1.default.log("info", `Can not find and update`);
                throw new Error(`Can not find and update`);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findByIdAndUpdate(id);
                return user;
            }
            catch (err) {
                logger_1.default.log("info", `Can not find and update`);
                throw new Error(`Can not find and update`);
            }
        });
    }
}
exports.UserServiceLocal = UserServiceLocal;
const UserService = new UserServiceLocal();
exports.UserService = UserService;
//# sourceMappingURL=User.service.js.map