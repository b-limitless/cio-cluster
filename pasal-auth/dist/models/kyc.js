"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KYC = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const KYCSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    industry: {
        type: [String],
        default: [],
    },
    employeeCount: {
        type: Number,
        required: true,
    },
    targetMarket: {
        type: [String],
        default: [],
    },
    currentWorkFlow: {
        type: String,
        default: null,
    },
    currentSoftware: {
        type: String,
        default: null,
    },
    painPoint: {
        type: String,
        default: null,
    },
    requirements: {
        type: String,
        default: null,
    },
    trainingAndSupport: {
        type: String,
        default: null,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        },
    },
});
KYCSchema.statics.build = (attrs) => {
    return new KYC(attrs);
};
const KYC = mongoose_1.default.model("KYC", KYCSchema);
exports.KYC = KYC;
//# sourceMappingURL=kyc.js.map