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
const permission = {
    name: "list_leads",
    cat: "ifa",
    guard_name: "sales",
    role: "sales executive",
};
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post("/api/users/permission/create")
        .send(permission)
        .expect(200);
}));
it("throw 401 error, if username and the password is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app).post("/api/users/signup").send({}).expect(400);
}));
it("usetype must be present while doing registration", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post("/api/users/signup")
        .send({ email: "bharatrose1@gmail.com", password: "thisismylife" })
        .expect(400);
}));
it("return with 400 with invalid passwod", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post("/api/users/signup")
        .send({
        email: "bharatrose1@",
        password: "pas",
    })
        .expect(400);
}));
it("return a 400 with missing email and password", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield supertest_1.default(app_1.app)
        .post("/api/users/signup")
        .send({
        email: "",
        password: "",
    })
        .expect(400);
}));
it("throws 400 error if no permission is provided", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post("/api/users/signup")
        .send({
        email: "bharatrose1@gmail.com",
        password: "thisismylife"
    })
        .expect(400);
}));
it("thow error if invalid verification code is provided", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield supertest_1.default(app_1.app)
            .post("/api/users/verify")
            .send({ verificationCode: 45564 })
            .expect(404);
    }
    catch (err) {
        console.log("err", err.message);
    }
}));
it("registere user sucessfully initially user is not verified and its sends request to verify user", () => __awaiter(void 0, void 0, void 0, function* () {
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
        const { verificationCode, user: { id, verified } } = JSON.parse(res.text);
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
}));
it("disallowed duplicate email registration", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield supertest_1.default(app_1.app)
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
        const res = yield supertest_1.default(app_1.app)
            .post("/api/users/signup")
            .send({
            email: "bharatrose1@gmail.com",
            password: "thisismylife",
            permissions: ["list_leads"],
            role: "admin",
            employeeCount: 50,
            industry: ["fashion"],
        })
            .expect(400);
        const { errors } = JSON.parse(res.text);
        expect(errors[0]["message"]).toEqual("Email address already exists");
    }
    catch (err) {
        console.log(err);
        throw new Error(err);
    }
}));
it("Register user with target market", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post("/api/users/signup")
        .send({
        email: "bharatrose4@gmail.com",
        password: "thisismylife",
        permissions: ["list_leads"],
        role: "admin",
        employeeCount: 50,
        industry: ["fashion"],
        targetMarket: ["fashion"],
    })
        .expect(201);
}));
//# sourceMappingURL=signup.test.js.map