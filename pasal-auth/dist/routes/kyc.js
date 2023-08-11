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
exports.KYCRouter = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("@pasal/common");
const KYC_body_request_1 = require("../body-request/KYC.body-request");
const KYC_service_1 = require("../services/KYC.service");
const logger_1 = __importDefault(require("../logger"));
const router = express_1.default.Router();
exports.KYCRouter = router;
router.post("/api/users/kyc", KYC_body_request_1.KYCBodyRequest, common_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { industry, employeeCount, currentWorkFlow, currentSoftware, painPoint, requirements, tranningAndSupport, } = req.body;
    const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const KYC = yield KYC_service_1.KYCService.build({
            userId,
            industry,
            employeeCount,
            currentWorkFlow,
            currentSoftware,
            painPoint,
            requirements,
            tranningAndSupport,
        });
        logger_1.default.log("info", "KYC Successfully created", KYC);
        return res.status(201).send(KYC);
    }
    catch (err) {
        logger_1.default.log("error", "Could not create kyc", err);
        res.status(500).send(err);
    }
}));
//# sourceMappingURL=kyc.js.map