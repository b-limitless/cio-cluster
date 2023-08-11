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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const user_1 = require("../../models/user");
it("create user and clear the session", () => __awaiter(void 0, void 0, void 0, function* () {
    const permission = {
        name: "list_leads",
        cat: "ifa",
        guard_name: "sales",
        role: "sales executive",
    };
    yield supertest_1.default(app_1.app)
        .post("/api/users/permission/create")
        .send(permission)
        .expect(200);
    try {
        const res = yield supertest_1.default(app_1.app)
            .post("/api/users/signup")
            .send({
            email: "abcdefgh86@gmail.com",
            password: "test",
            permissions: ["list_leads"],
            role: "admin",
            employeeCount: 50,
            industry: ["fashion"],
        })
            .expect(201);
        const { verificationCode, user: { id, verified }, } = JSON.parse(res.text);
        expect(verified).toEqual(false);
        yield supertest_1.default(app_1.app)
            .post("/api/users/verify")
            .send({ verificationCode })
            .expect(200);
        const findUser = yield user_1.User.findById(id);
        expect(findUser === null || findUser === void 0 ? void 0 : findUser.verified).toEqual(true);
    }
    catch (err) {
        console.log("err", err.message);
    }
    const logout = yield supertest_1.default(app_1.app).get("/api/users/signout").expect(200);
    expect(logout.get("Set-Cookie")[0]).toEqual("express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly");
}));
//# sourceMappingURL=signout.test.js.map