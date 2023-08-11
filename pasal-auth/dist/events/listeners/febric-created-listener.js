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
exports.FebricCreatedListener = void 0;
const common_1 = require("@pasal/common");
const logger_1 = __importDefault(require("@pasal/common/build/logger"));
const FebricService_1 = require("../../services/FebricService");
class FebricCreatedListener extends common_1.Listener {
    constructor() {
        super(...arguments);
        this.subject = common_1.Subjects.FebricCreated;
    }
    onMessage(data, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const parseData = JSON.parse(data);
            try {
                const febric = yield FebricService_1.FebricService.build(parseData);
                logger_1.default.log("info", "Febric has been created");
                logger_1.default.log("info", febric.id);
            }
            catch (err) {
                logger_1.default.log("error", "Can not create febric");
            }
        });
    }
}
exports.FebricCreatedListener = FebricCreatedListener;
//# sourceMappingURL=febric-created-listener.js.map