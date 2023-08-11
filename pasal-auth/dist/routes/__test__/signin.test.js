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
it("throw 400 error when no email supplied", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app).post("/api/users/signin").send({}).expect(400);
}));
it("throw 400 error when invalid email supplied email supplied", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post("/api/users/signin")
        .send({ email: "asdfsf" })
        .expect(400);
}));
it("throw 400 error when no password supplied", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post("/api/users/signin")
        .send({ email: "asdfsf@gmail.com" })
        .expect(400);
}));
it("faild when invalid username and password is provided", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield supertest_1.default(app_1.app)
        .post("/api/users/signin")
        .send({
        email: "bharatrose1@gmail.com",
        password: "password",
    })
        .expect(400);
    const parseResponse = JSON.parse(response.text);
    expect(parseResponse.errors[0].message).toEqual("Invalid credentials");
}));
it("sign in with the unverified dummyUser", () => __awaiter(void 0, void 0, void 0, function* () {
    const dummyUser = { email: "bharatrose1@gmail.com", password: "thisismylife" };
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
    yield supertest_1.default(app_1.app)
        .post("/api/users/signup")
        .send(Object.assign(Object.assign({}, dummyUser), { permissions: ["list_leads"], role: "admin", employeeCount: 50, industry: ["fashion"] }))
        .expect(201);
    yield supertest_1.default(app_1.app)
        .post("/api/users/signin")
        .send(Object.assign({}, dummyUser))
        .expect(400);
}));
it("create user, verify and successfully signin", () => __awaiter(void 0, void 0, void 0, function* () {
    const dummyUser = { email: "bharatrose1@gmail.com", password: "thisismylife" };
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
    const response = yield supertest_1.default(app_1.app)
        .post("/api/users/signup")
        .send(Object.assign(Object.assign({}, dummyUser), { permissions: ["list_leads"], role: "admin", employeeCount: 50, industry: ["fashion"] }))
        .expect(201);
    const { verificationCode, user } = JSON.parse(response.text);
    expect(user.verified).toEqual(false);
    const verifyUser = yield supertest_1.default(app_1.app)
        .post("/api/users/verify")
        .send({ verificationCode: verificationCode })
        .expect(200);
    expect(verifyUser.get("Set-Cookie")).toBeDefined();
    const signInResponse = yield supertest_1.default(app_1.app)
        .post("/api/users/signin")
        .send(Object.assign({}, dummyUser))
        .expect(201);
    expect(signInResponse.get("Set-Cookie")).toBeDefined();
}));
//# sourceMappingURL=signin.test.js.map