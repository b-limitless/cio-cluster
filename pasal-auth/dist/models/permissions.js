"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const permissionSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    cat: {
        type: String,
        required: true
    },
    guard_name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: () => new Date()
    },
    role: {
        type: String,
        required: true
    },
    users_id: {
        type: Array
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});
permissionSchema.statics.build = (attrs) => {
    return new Permission(attrs);
};
const Permission = mongoose_1.default.model("Permission", permissionSchema);
exports.Permission = Permission;
//# sourceMappingURL=permissions.js.map