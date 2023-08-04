import request from "supertest";
import { app } from "../../app";
import { User } from "../../models/user";

const permission = {
  name: "list_leads",
  cat: "ifa",
  guard_name: "sales",
  role: "sales executive",
};

beforeEach(async () => {
  await request(app)
    .post("/api/users/permission/create")
    .send(permission)
    .expect(200);
});

it("throw 401 error, if username and the password is not provided", async () => {
  await request(app).post("/api/users/signup").send({}).expect(400);
});

// it("will send patch request ")

