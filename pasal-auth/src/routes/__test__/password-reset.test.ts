import request from "supertest";
import { User } from "../../../src/models/user";
import { app } from "../../app";

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

it("throw 400 bad request error if no email address is supplied", async () => {
  await request(app)
    .post("/api/users/reset-password/request")
    .send({})
    .expect(400);
});

it("will response with 201 regardless of existing user or not", async () => {
  const response = await request(app)
    .post("/api/users/reset-password/request")
    .send({ email: "bharatrose1@gmail.com" })
    .expect(201);

  const parseResponse = JSON.parse(response.text);

  expect(parseResponse).toEqual(true);
});

it("will receive the code if email exists in the db", async () => {
  // Create user first
  let verifiedUser: any = {};

  try {
    const res = await request(app)
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

    // Extract verification code
    const {
      verificationCode,
      user: { id, verified },
    } = JSON.parse(res.text);

    expect(verified).toEqual(false);
    // // Send the verification code to the api
    await request(app)
      .post("/api/users/verify")
      .send({ verificationCode })
      .expect(200);

    // // //  Find the user by that id
    verifiedUser = await User.findById(id);

    // const {verified} = findUser;
    expect(verifiedUser?.verified).toEqual(true);
  } catch (err: any) {
    console.log("err", err.message);
  }
  // Request to verify the users

  const { email } = verifiedUser;
  const response = await request(app)
    .post("/api/users/reset-password/request")
    .send({ email })
    .expect(201);

  const parseResponse = JSON.parse(response.text);
  const { code, user_id } = parseResponse;

  // Send patch request to server to update

  let upatePassword = await request(app)
    .patch("/api/users/reset-password/request")
    .send({ code, user_id })
    .expect(400);

  let updatePasswordResponse = JSON.parse(upatePassword.text);

  expect(updatePasswordResponse["errors"][0]["message"]).toEqual(
    "Please enter the password"
  );

  // Send request with the passwor
  upatePassword = await request(app)
    .patch("/api/users/reset-password/request")
    .send({ code, user_id, password: "helloWorld123" })
    .expect(400);

  updatePasswordResponse = JSON.parse(upatePassword.text);

  expect(updatePasswordResponse["errors"][0]["message"]).toEqual(
    "Both password did not match"
  );

  // Send the password both matching
  upatePassword = await request(app)
  .patch("/api/users/reset-password/request")
  .send({ code, user_id, password: "helloWorld123", confirmPassword: "helloWorld123" })
  .expect(200);

  // Try to login with the old password will throw and error

  try {

  } catch(err) {

  }
  let sigin = await request(app)
      .post("/api/users/signin")
      .send({
        email: "abcdefgh86@gmail.com",
        password: "test45656",
      })
      .expect(400);

      updatePasswordResponse = JSON.parse(sigin.text);

      expect(updatePasswordResponse["errors"][0]["message"]).toEqual(
        "Invalid credentials"
      );

    //Singin with right password

     const signinWithValidPassword = await request(app)
    .post("/api/users/signin")
    .send({
      email: "abcdefgh86@gmail.com",
      password: "helloWorld123",
    })
    .expect(201);

    expect(signinWithValidPassword.get("Set-Cookie")).toBeDefined();
    
    updatePasswordResponse = JSON.parse(signinWithValidPassword.text);
    

    console.log('updatePasswordResponse', updatePasswordResponse)

});

// it("create permission, users and password request", async () => {
//   await request(app)
//     .post("/api/users/permission/create")
//     .send(permission)
//     .expect(200);

//   const response = await request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "bharatrose1@gmail.com",
//       password: "thisismylife",
//       usertype: "seller",
//       permissions: ["list_leads"],
//     })
//     .expect(201);

//   const { email } = JSON.parse(response.text);

//   await request(app)
//     .post("/api/users/request_reset_password")
//     .send({ email })
//     .expect(201);
// });

// it("throw 400 error if code is not provided", async () => {
//   await request(app)
//     .post("/api/users/updated_password")
//     .send({ df: "fg" })
//     .expect(400);
// });

// it("400 error if both password is not identical", async () => {
//   await request(app)
//     .post("/api/users/permission/create")
//     .send(permission)
//     .expect(200);

//   const response = await request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "bharatrose1@gmail.com",
//       password: "thisismylife",
//       usertype: "seller",
//       permissions: ["list_leads"],
//     })
//     .expect(201);

//   const { email } = JSON.parse(response.text);

//   const passwordRequest = await request(app)
//     .post("/api/users/request_reset_password")
//     .send({ email })
//     .expect(201);

//   const decodeResponse = JSON.parse(passwordRequest.text);

//   const invalidConPass = await request(app)
//     .post("/api/users/updated_password")
//     .send({
//       code: decodeResponse.code,
//       user_id: decodeResponse.user_id,
//       password: "hello",
//       confirmPassword: "hell",
//     })
//     .expect(400);

//   const errors = JSON.parse(invalidConPass.text);
//   expect(errors.errors[0].message).toBeDefined();
//   expect(errors.errors[0].message).toContain("Both password did not match");

// });

// it("Will finall update the password with status kye 400", async () => {
//   await request(app)
//     .post("/api/users/permission/create")
//     .send(permission)
//     .expect(200);

//   const response = await request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "bharatrose1@gmail.com",
//       password: "thisismylife",
//       usertype: "seller",
//       permissions: ["list_leads"],
//     })
//     .expect(201);

//   const { email } = JSON.parse(response.text);

//   const passwordRequest = await request(app)
//     .post("/api/users/request_reset_password")
//     .send({ email })
//     .expect(201);
//   const decodeResponse = JSON.parse(passwordRequest.text);

//   const invalidConPass = await request(app)
//     .post("/api/users/updated_password")
//     .send({
//       code: decodeResponse.code,
//       user_id: decodeResponse.user_id,
//       password: "hello",
//       confirmPassword: "hell",
//     })
//     .expect(400);

//   const errors = JSON.parse(invalidConPass.text);
//   expect(errors.errors[0].message).toBeDefined();
//   expect(errors.errors[0].message).toContain("Both password did not match");

//   const updatePassword = await request(app)
//     .post("/api/users/updated_password")
//     .send({
//       code: decodeResponse.code,
//       user_id: decodeResponse.user_id,
//       password: "thisismylife",
//       confirmPassword: "thisismylife",
//     })
//     .expect(204);
// });
