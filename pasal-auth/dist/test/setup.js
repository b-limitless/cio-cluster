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
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let mongo;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    process.env.NODE_ENV = "test";
    process.env.JWT_KEY = 'asdf';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    mongo = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    yield mongoose_1.default.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    const collections = yield mongoose_1.default.connection.db.collections();
    for (let collection of collections) {
        yield collection.deleteMany({});
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongo.stop();
    mongoose_1.default.connection.close();
}));
global.signin = (permissions) => {
    const payload = {
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        email: 'test@test.com',
        permissions: permissions,
        role: 'admin',
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY);
    const session = { jwt: token };
    const sessionJSON = JSON.stringify(session);
    const base64 = Buffer.from(sessionJSON).toString('base64');
    return [`express:sess=${base64}`];
};
//# sourceMappingURL=setup.js.map