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
exports.KYCService = exports.KYCServiceLocal = void 0;
const logger_1 = __importDefault(require("../logger"));
const kyc_1 = require("../models/kyc");
class KYCServiceLocal {
    build(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const buildKYC = kyc_1.KYC.build(Object.assign({}, data));
                yield buildKYC.save();
                logger_1.default.log("info", "KYC successfully build", buildKYC);
                return buildKYC;
            }
            catch (err) {
                logger_1.default.log("error", `Could not save KYC: ${err}`);
                throw new Error(err);
            }
        });
    }
    findByIdAndUpdate(id, update, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield kyc_1.KYC.findByIdAndUpdate(id, update, options);
                return updated;
            }
            catch (err) {
                logger_1.default.log("info", `Can not find and update`);
                throw new Error(`Can not find and update`);
            }
        });
    }
}
exports.KYCServiceLocal = KYCServiceLocal;
const KYCService = new KYCServiceLocal();
exports.KYCService = KYCService;
//# sourceMappingURL=KYC.service.js.map