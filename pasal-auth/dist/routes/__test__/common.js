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
exports.signUpVerifyUserGetToken = void 0;
const supertest_1 = __importDefault(require("supertest"));
const user_1 = require("../../models/user");
function signUpVerifyUserGetToken(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const permission = {
            name: "list_leads",
            cat: "ifa",
            guard_name: "sales",
            role: "sales executive",
        };
        yield supertest_1.default(app)
            .post("/api/users/permission/create")
            .send(permission)
            .expect(200);
        const response = yield supertest_1.default(app)
            .post("/api/users/signup")
            .send({
            email: "bharatrose1@gmail.com",
            password: "thisismylife",
            permissions: ["list_leads"],
            role: "admin",
            employeeCount: 50,
            industry: ["fashion"],
        })
            .expect(201);
        const { verificationCode, user } = JSON.parse(response.text);
        expect(user.verified).toEqual(false);
        const verifyUser = yield supertest_1.default(app)
            .post("/api/users/verify")
            .send({ verificationCode: verificationCode })
            .expect(200);
        expect(verifyUser.get("Set-Cookie")).toBeDefined();
        const token = verifyUser.get("Set-Cookie");
        const findUser = yield user_1.User.findById(user.id);
        expect(findUser === null || findUser === void 0 ? void 0 : findUser.verified).toEqual(true);
        return token;
    });
}
exports.signUpVerifyUserGetToken = signUpVerifyUserGetToken;
//# sourceMappingURL=common.js.map