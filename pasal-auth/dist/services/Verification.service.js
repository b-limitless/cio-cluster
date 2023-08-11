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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerficationService = void 0;
const logger_1 = __importDefault(require("../logger"));
const verification_1 = require("../models/verification");
class VerificationServiceLocal {
    build(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verification = verification_1.Verification.build(Object.assign({}, data));
                yield verification.save();
                return verification;
            }
            catch (err) {
                logger_1.default.log("error", `Could not save verification: ${err}`);
                throw new Error(err);
            }
        });
    }
    find(_a) {
        var query = __rest(_a, []);
        return __awaiter(this, void 0, void 0, function* () {
            const findVerificationCode = yield verification_1.Verification.find(Object.assign({}, query));
            return findVerificationCode;
        });
    }
}
const VerficationService = new VerificationServiceLocal();
exports.VerficationService = VerficationService;
//# sourceMappingURL=Verification.service.js.map