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
it("Throw an 403 error if user is not authenticaled", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app).post("/api/users/kyc").send({}).expect(401);
}));
it("will singup, verify user and will receive token, kyc will start, ", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post("/api/users/kyc")
        .set("Cookie", global.signin([]))
        .send({ employeeCount: 20 })
        .expect(201);
}));
it("create kyc with industry data", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield supertest_1.default(app_1.app)
        .post("/api/users/kyc")
        .set("Cookie", global.signin([]))
        .send({
        employeeCount: 20,
        industry: ["json"],
        currentWorkFlow: "hello wrold",
        painPoint: "something we had",
    })
        .expect(201);
    const parseRes = JSON.parse(res.text);
    expect(parseRes.industry).toEqual(["json"]);
    expect(parseRes.currentWorkFlow).toEqual("hello wrold");
    expect(parseRes.painPoint).toEqual("something we had");
}));
//# sourceMappingURL=kyc.test.js.map