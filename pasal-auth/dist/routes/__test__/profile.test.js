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
        const { verificationCode, user: { id, verified }, } = JSON.parse(res.text);
        expect(verified).toEqual(false);
        yield supertest_1.default(app_1.app)
            .post("/api/users/verify")
            .send({ verificationCode })
            .expect(200);
        const findUser = yield user_1.User.findById(id);
        expect(findUser === null || findUser === void 0 ? void 0 : findUser.verified).toEqual(true);
        try {
            const updatedUserModel = {
                firstName: "Nigger",
                lastName: "Shah",
                country: "UAE",
                spokenLanguage: ["en", "ar"],
                about: "This is bharat",
                profileImageLink: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            };
            const updateUser = yield supertest_1.default(app_1.app)
                .patch(`/api/users/${id}`)
                .set("Cookie", global.signin([]))
                .send(updatedUserModel)
                .expect(200);
            const parseUpdateResponse = JSON.parse(updateUser.text);
        }
        catch (err) {
            console.log("Error while updating the user", err);
        }
    }
    catch (err) {
        console.log("err", err.message);
    }
}));
it("will update the user passoword as well, If user specify new password, set new token", () => __awaiter(void 0, void 0, void 0, function* () {
}));
//# sourceMappingURL=profile.test.js.map