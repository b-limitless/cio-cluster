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
  await request(app).post("/api/users/team").send({}).expect(400);
});

it("usetype must be present while doing registration", async () => {
  await request(app)
    .post("/api/users/team")
    .send({ email: "bharatrose1@gmail.com", password: "thisismylife" })
    .expect(400);
});

it("return with 400 with invalid passwod", async () => {
  await request(app)
    .post("/api/users/team")
    .send({
      email: "bharatrose1@",
      password: "pas",
    })
    .expect(400);
});

it("return a 400 with missing email and password", async () => {
  const response = await request(app)
    .post("/api/users/team")
    .send({
      email: "",
      password: "",
    })
    .expect(400);
});

it("throws 400 error if no permission is provided", async () => {
  await request(app)
    .post("/api/users/team")
    .send({
      email: "bharatrose1@gmail.com",
      password: "thisismylife"
    })
    .expect(400);
});

it("throw 401 unauthroize error if user does not have create team permission", async () => {
  try {
    const res = await request(app)
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
  } catch (err: any) {
    console.log("err", err.message);
  }
});

it("disallowed duplicate email registration", async () => {
  try {
    await request(app)
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

    const res =  await request(app)
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

    const {errors} = JSON.parse(res.text);
    expect(errors[0]["message"]).toEqual("Email address already exists");
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
});


it("It will create team with first name, lastname, email, role, permission, enabled", async () => {
  try {
    const res = await request(app)
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
  } catch (err: any) {
    console.log("err", err.message);
  }
});






