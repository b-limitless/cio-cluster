"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Febric = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_update_if_current_1 = require("mongoose-update-if-current");
const febricSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    febricId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    deliveryTime: {
        type: String,
        required: true,
    },
    excellence: {
        type: String,
        required: true,
    },
    warmth: {
        type: String,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    season: {
        type: String,
        required: true,
    },
    threadStyle: {
        type: String,
        required: true,
    },
    brightness: {
        type: String,
        required: true,
    },
    superShiny: {
        type: Boolean,
        required: true,
    },
    material: {
        type: String,
        required: true,
    },
    tone: {
        type: String,
        required: true,
    },
    threadCount: {
        type: Number,
        required: true,
    },
    opacity: {
        type: String,
        required: true,
    },
    waterproof: {
        type: Boolean,
        required: true,
    },
    stretchyText: {
        type: String,
        required: true,
    },
    stretchy: {
        type: Boolean,
        required: true,
    },
    mis: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    febricTypes: {
        type: String,
        required: true,
    },
    febricSeasons: {
        type: String,
        required: true,
    },
    threadTypes: {
        type: String,
        required: true,
    },
    threadCounts: {
        type: String,
        required: true,
    },
    characters: {
        type: [String],
        required: true,
    },
    thumbnailImageUrl: {
        type: String,
        required: true
    },
    originalImageUrl: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
});
febricSchema.set("versionKey", "version");
febricSchema.plugin(mongoose_update_if_current_1.updateIfCurrentPlugin);
febricSchema.statics.build = (attrs) => {
    return new Febric(attrs);
};
const Febric = mongoose_1.default.model("Febric", febricSchema);
exports.Febric = Febric;
//# sourceMappingURL=febric.js.map