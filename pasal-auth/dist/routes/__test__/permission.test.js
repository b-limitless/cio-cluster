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
it("thow en 400 error if no permission name is supplied", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app).post("/api/users/permission/create").send({}).expect(400);
}));
it("thow en 400 error if no permission name is only supplied", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post("/api/users/permission/create")
        .send({ name: "list_clients" })
        .expect(400);
}));
it("creat permission if all attrs is supplied", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post("/api/users/permission/create")
        .send({
        name: "list_clients",
        cat: "sales",
        guard_name: "sales",
        role: "sales executive",
    })
        .expect(200);
}));
it("throw error if create permission with same name and category", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post("/api/users/permission/create")
        .send({
        name: "list_clients",
        cat: "sales",
        guard_name: "sales",
        role: "sales executive",
    })
        .expect(200);
    yield supertest_1.default(app_1.app)
        .post("/api/users/permission/create")
        .send({
        name: "list_clients",
        cat: "sales",
        guard_name: "sales",
        role: "sales executive",
    })
        .expect(400);
}));
it("will create permission and will list attributes, users_id, name, cat, etc", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield supertest_1.default(app_1.app)
        .post("/api/users/permission/create")
        .send({
        name: "list_clients",
        cat: "sales",
        guard_name: "sales",
        role: "sales executive",
    })
        .expect(200);
    let data = JSON.parse(response.text);
    expect(data.permission.id).toBeDefined();
    expect(data.permission.cat).toBeDefined();
    expect(data.permission.name).toBeDefined();
    expect(data.permission.guard_name).toBeDefined();
}));
//# sourceMappingURL=permission.test.js.map