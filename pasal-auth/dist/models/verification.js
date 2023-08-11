"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verification = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const VerificationSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    verificationCode: {
        type: Number,
        default: null,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    expireAt: { type: Date, expires: 10 * 60 * 60 * 24 * 3 },
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
VerificationSchema.statics.build = (attrs) => {
    return new Verification(attrs);
};
const Verification = mongoose_1.default.model("Verification", VerificationSchema);
exports.Verification = Verification;
//# sourceMappingURL=verification.js.map