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
const app_1 = require("./app");
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
process.env.JWT_KEY = "asdf";
process.env.MONGO_URI = "mongodb+srv://bharatrosedb:ThisIsMyLife123@mydb59589.l8gpx.mongodb.net/mydb59589";
process.env.NODE_ENV = "development";
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.JWT_KEY) {
        logger_1.default.log({
            level: "error",
            message: "JWT key must be defined"
        });
        throw new Error("JWT key must be defined");
    }
    if (!process.env.MONGO_URI) {
        logger_1.default.log({
            level: "error",
            message: "MONGO_URI must be defined"
        });
        throw new Error("MONGO_URI must be defined");
    }
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        logger_1.default.log({
            level: "info",
            message: "connected to mongod"
        });
    }
    catch (error) {
        logger_1.default.log({
            level: "error",
            message: `Error while connecting with MongoDB:${error}`
        });
    }
});
start();
app_1.app.listen(3000, () => {
    logger_1.default.log({
        level: "info",
        message: `Listening on port 3000`
    });
});
//# sourceMappingURL=index.js.map