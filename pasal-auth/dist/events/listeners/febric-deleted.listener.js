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
exports.FebricDeletedListener = void 0;
const common_1 = require("@pasal/common");
const FebricService_1 = require("../../services/FebricService");
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../../logger"));
class FebricDeletedListener extends common_1.Listener {
    constructor(channel) {
        super(channel);
        this.subject = common_1.Subjects.FebricDeleted;
    }
    onMessage(data, message) {
        return __awaiter(this, void 0, void 0, function* () {
            let { febricId } = JSON.parse(data);
            febricId = mongoose_1.default.Types.ObjectId(febricId);
            try {
                yield FebricService_1.FebricService.findOneAndDelete({ febricId });
                logger_1.default.log("info", `febric is sucessfully deleted with id ${febricId}`);
            }
            catch (err) {
                logger_1.default.log("error", `Could not delete the febric with id ${febricId}`);
            }
        });
    }
}
exports.FebricDeletedListener = FebricDeletedListener;
//# sourceMappingURL=febric-deleted.listener.js.map