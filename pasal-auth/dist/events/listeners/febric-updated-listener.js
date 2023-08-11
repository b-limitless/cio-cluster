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
exports.FebricUpdatedListener = void 0;
const common_1 = require("@pasal/common");
const logger_1 = __importDefault(require("@pasal/common/build/logger"));
const mongoose_1 = __importDefault(require("mongoose"));
const FebricService_1 = require("../../services/FebricService");
class FebricUpdatedListener extends common_1.Listener {
    constructor() {
        super(...arguments);
        this.subject = common_1.Subjects.FebricUpdated;
    }
    onMessage(data, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const parseData = JSON.parse(data);
            let { febricId } = parseData, rest = __rest(parseData, ["febricId"]);
            febricId = mongoose_1.default.Types.ObjectId(febricId);
            try {
                const updtaedFebric = yield FebricService_1.FebricService.findOneAndUpdate({ febricId }, Object.assign({}, rest), { new: true });
                logger_1.default.log("info", "Febric has been successfully updated");
                logger_1.default.log("info", updtaedFebric);
            }
            catch (err) {
                logger_1.default.log("error", `Could not updated febric with id ${febricId}`);
            }
        });
    }
}
exports.FebricUpdatedListener = FebricUpdatedListener;
//# sourceMappingURL=febric-updated-listener.js.map