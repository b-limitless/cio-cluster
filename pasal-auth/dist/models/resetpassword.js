"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPassword = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var updated;
(function (updated) {
    updated[updated["true"] = 0] = "true";
    updated[updated["false"] = 1] = "false";
})(updated || (updated = {}));
const resetPasswordSchema = new mongoose_1.default.Schema({
    user_id: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: () => new Date()
    },
    expire_at: {
        type: Date,
        default: () => new Date(+new Date() + 8 * 60 * 60 * 1000),
        required: true
    },
    updated: {
        type: Boolean,
        enum: [true, false],
        default: () => false
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete (ret._id);
            delete (ret.__v);
        }
    }
});
resetPasswordSchema.statics.build = (attrs) => {
    return new ResetPassword(attrs);
};
const ResetPassword = mongoose_1.default.model('ResetPassword', resetPasswordSchema);
exports.ResetPassword = ResetPassword;
//# sourceMappingURL=resetpassword.js.map