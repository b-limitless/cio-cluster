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
const common_1 = require("./common");
const permission = {
    name: "list_leads",
    cat: "ifa",
    guard_name: "sales",
    role: "sales executive",
};
it("make request to verification code api", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield supertest_1.default(app_1.app)
        .post("/api/users/verify")
        .send({})
        .expect(400);
    const json = JSON.parse(response.text);
    expect(json.errors[0]["field"]).toEqual("verificationCode");
}));
it("return not found If invalid verfication code is provided", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post("/api/users/verify")
        .send({ verificationCode: 44545 })
        .expect(404);
}));
it("will verify the user and will set the auth token to the cookie header", () => __awaiter(void 0, void 0, void 0, function* () {
    yield common_1.signUpVerifyUserGetToken(app_1.app);
}));
//# sourceMappingURL=verification.test.js.map