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
    yield supertest_1.default(app_1.app).post("/api/users/team").send({}).expect(400);
}));
it("usetype must be present while doing registration", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post("/api/users/team")
        .send({ email: "bharatrose1@gmail.com", password: "thisismylife" })
        .expect(400);
}));
it("return with 400 with invalid passwod", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post("/api/users/team")
        .send({
        email: "bharatrose1@",
        password: "pas",
    })
        .expect(400);
}));
it("return a 400 with missing email and password", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield supertest_1.default(app_1.app)
        .post("/api/users/team")
        .send({
        email: "",
        password: "",
    })
        .expect(400);
}));
it("throws 400 error if no permission is provided", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post("/api/users/team")
        .send({
        email: "bharatrose1@gmail.com",
        password: "thisismylife"
    })
        .expect(400);
}));
it("throw 401 unauthroize error if user does not have create team permission", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield supertest_1.default(app_1.app)
            .post("/api/users/team")
            .set("Cookie", global.signin([]))
            .send({
            firstName: "Bharat",
            lastName: "Shah",
            email: "abcdefgh86@gmail.com",
            password: "test",
            permissions: ["list_leads"],
            role: "developer",
        })
            .expect(401);
    }
    catch (err) {
        console.log("err", err.message);
    }
}));
it("disallowed duplicate email registration", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield supertest_1.default(app_1.app)
            .post("/api/users/team")
            .set("Cookie", global.signin(["create_team"]))
            .send({
            email: "bharatrose1@gmail.com",
            password: "thisismylife",
            permissions: ["list_leads"],
            role: "developer",
            firstName: "Bharat",
            lastName: "Shah"
        })
            .expect(201);
        const res = yield supertest_1.default(app_1.app)
            .post("/api/users/team")
            .set("Cookie", global.signin(["create_team"]))
            .send({
            email: "bharatrose1@gmail.com",
            password: "thisismylife",
            permissions: ["list_leads"],
            role: "admin",
            firstName: "Bharat",
            lastName: "Shah"
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
it("It will create team with first name, lastname, email, role, permission, enabled", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield supertest_1.default(app_1.app)
            .post("/api/users/team")
            .set("Cookie", global.signin(["create_team"]))
            .send({
            firstName: "Bharat",
            lastName: "Shah",
            email: "abcdefgh86@gmail.com",
            password: "test",
            permissions: ["list_leads"],
            role: "developer",
        })
            .expect(201);
    }
    catch (err) {
        console.log("err", err.message);
    }
}));
//# sourceMappingURL=team.test.js.map