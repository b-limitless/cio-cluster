import request from "supertest";
import { app } from "../../app";
import fs from "fs";
import path from "path";

it("While not selecting file it will thow an error 400", async () => {
    const response = await request(app)
    .post("/api/products/v1/upload")
    .send({})
    .expect(401);

  const parseResponse = JSON.parse(response.text);
  expect(parseResponse.errors[0]["message"]).toEqual(
    "Not Authorized"
  );
});


it("will sign in as a user and throw 400 bad request because no file is selected", async () => {
    const validImage = path.resolve(__dirname, `./validfile.webp`);
    const invalidFile = path.resolve(__dirname, `./test1.txt`)

    const response = await request(app)
    .post("/api/products/v1/upload")
    .set('content-type', 'application/octet-stream')
    .set("Cookie", global.signin([]))
    .attach('image', invalidFile)
    .expect(400);

    const parseResponse = JSON.parse(response.text);

    expect(parseResponse.errors[0]["message"]).toEqual(
        "Error while uploading file Error: Error uploading image:Error: Invalid image type, only jpeg, png, gif, webp extension is allwoed"
      );
    // console.log(parseResponse);

});

it("will upload file with less then 5 MB and image type", async() => {
    const validImage = path.resolve(__dirname, `./validfile.webp`);

    const response = await request(app)
    .post("/api/products/v1/upload")
    .set('content-type', 'application/octet-stream')
    .set("Cookie", global.signin([]))
    .attach('image', validImage)
    .expect(200);

    const parseResponse = JSON.parse(response.text);

    console.log(parseResponse)
});

  