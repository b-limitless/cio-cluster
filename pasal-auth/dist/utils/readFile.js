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
exports.readFile = void 0;
const logger_1 = __importDefault(require("../logger"));
const util_1 = __importDefault(require("util"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const readFileAsync = util_1.default.promisify(fs_1.default.readFile);
const readFile = (templateURL, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const templateFilePath = path_1.default.join(__dirname, '..', 'email-templates', templateURL);
        const readEmailTemplate = yield readFileAsync(templateFilePath, "utf-8");
        const template = handlebars_1.default.compile(readEmailTemplate);
        const emailbody = template(data);
        return emailbody;
    }
    catch (err) {
        logger_1.default.log("error", err);
    }
});
exports.readFile = readFile;
//# sourceMappingURL=readFile.js.map