import { app } from "../../app";
import request from "supertest";

import { rabbitMQWrapper } from "../../rabbitmq-wrapper";

it("throw 401 un autorized error when there is no authentication", async () => {
  const response = await request(app)
    .post("/api/products/v1/new")
    .send({})
    .expect(401);
  const parseResponse = JSON.parse(response.text);
  expect(parseResponse.errors[0]["message"]).toEqual("Not Authorized");
});

it("throw 401 error if user is authenticated but does not have create product prermission", async () => {
  const response = await request(app)
    .post("/api/products/v1/new")
    .set("Cookie", global.signin([]))
    .send({})
    .expect(401);

  const parseResponse = JSON.parse(response.text);
  expect(parseResponse.errors[0]["message"]).toEqual(
    "Not Authorized, Required following permission create_febric"
  );
});

it("will provided the required permission for the api create_febric", async () => {
  const response = await request(app)
    .post("/api/products/v1/new")
    .set("Cookie", global.signin(["create_febric"]))
    .send({})
    .expect(400);

  const parseResponse = JSON.parse(response.text);
  expect(parseResponse.errors.length).toEqual(25); // Could change in the future
 
});

it("provideds title will throw remaining error ", async () => {
  const response = await request(app)
    .post("/api/products/v1/new")
    .set("Cookie", global.signin(["create_febric"]))
    .send({
      title: "This is febric",
    })
    .expect(400);

  const parseResponse = JSON.parse(response.text);
  expect(parseResponse.errors.length).toEqual(24); // Could change in the future

});

it("provideds price will throw remaining error ", async () => {
  const response = await request(app)
    .post("/api/products/v1/new")
    .set("Cookie", global.signin(["create_febric"]))
    .send({
      title: "This is febric",
      price: 455,
    })
    .expect(400);

  const parseResponse = JSON.parse(response.text);
  expect(parseResponse.errors.length).toEqual(23); // Could change in the future
});

it("provideds delivery_time will throw remaining error ", async () => {
  const response = await request(app)
    .post("/api/products/v1/new")
    .set("Cookie", global.signin(["create_febric"]))
    .send({
      title: "This is febric",
      price: 455,
      deliveryTime: "3 days",
    })
    .expect(400);

  const parseResponse = JSON.parse(response.text);
  expect(parseResponse.errors.length).toEqual(22); // Could change in the future
});

it("will provide all required data returns 201", async () => {
  const sampleData = {
    title: "Sample Fabric",
    price: 100,
    deliveryTime: "2 days",
    imageLink: "http://example.com/fabric-image.jpg",
    excellence: "4 rating stars",
    warmth: "3 rating stars",
    weight: "500 gr/m^2",
    season: "Summer",
    threadStyle: "Plain",
    brightness: "High",
    superShiny: false,
    material: "Cotton",
    tone: "Blue",
    threadCount: 300,
    opacity: "Opaque",
    waterproof: true,
    stretchyText: "Stretchy fabric",
    stretchy: true,
    mis: "New",
    type: "Pants",
    febricTypes: "Cotton",
    febricSeasons: "Winter",
    threadTypes: "Cotton",
    threadCounts: "200-400",
    characters: ["New", "Comfortable", "Durable"],
  };

  const response = await request(app)
    .post("/api/products/v1/new")
    .set("Cookie", global.signin(["create_febric"]))
    .send({ ...sampleData })
    .expect(201);

  console.log(response.text)
});

// it("response with status 400 if user is authenticated", async () => {
//   const response = await request(app)
//     .post("/api/products/v1/new")
//     .set("Cookie", global.signin())
//     .send({})
//     .expect(400);

//   const parseResponse = JSON.parse(response.text);
//   expect(parseResponse.errors).toBeDefined();
//   expect(parseResponse.errors.length).toStrictEqual(5);
// });

// it("response with status 400 if only name is provided", async () => {
//   const response = await request(app)
//     .post("/api/products/v1/new")
//     .set("Cookie", global.signin())
//     .send({ name: "coat" })
//     .expect(400);

//   const parseResponse = JSON.parse(response.text);
//   expect(parseResponse.errors).toBeDefined();
//   expect(parseResponse.errors.length).toStrictEqual(4);
// });

// it("response with status 400 if only name and category is provided", async () => {
//   const response = await request(app)
//     .post("/api/products/v1/new")
//     .set("Cookie", global.signin())
//     .send({ name: "coat", category: "cloth" })
//     .expect(400);

//   const parseResponse = JSON.parse(response.text);
//   expect(parseResponse.errors).toBeDefined();
//   expect(parseResponse.errors.length).toStrictEqual(3);
// });

// it("response with status 400 if only name and category is provided", async () => {
//   const response = await request(app)
//     .post("/api/products/v1/new")
//     .set("Cookie", global.signin())
//     .send({ name: "coat", category: "cloth" })
//     .expect(400);

//   const parseResponse = JSON.parse(response.text);
//   expect(parseResponse.errors).toBeDefined();
//   expect(parseResponse.errors.length).toStrictEqual(3);
// });

// it("response with status 400 if only name and category, subCagegory is provided", async () => {
//   const response = await request(app)
//     .post("/api/products/v1/new")
//     .set("Cookie", global.signin())
//     .send({ name: "coat", category: "cloth", subCategory: "cloth" })
//     .expect(400);

//   const parseResponse = JSON.parse(response.text);
//   expect(parseResponse.errors).toBeDefined();
//   expect(parseResponse.errors.length).toStrictEqual(2);
// });

// it("response with 201 code when product is created", async () => {
//   const response = await request(app)
//     .post("/api/products/v1/new")
//     .set("Cookie", global.signin())
//     .send({
//       name: "coat",
//       category: "cloth",
//       subCategory: "cloth",
//       price: 100,
//       availableItems: 100,
//     })
//     .expect(201);
//   const parseResponse = JSON.parse(response.text);
//   expect(parseResponse.id).toBeDefined();
//   expect(Object.entries(parseResponse).length).toStrictEqual(9);
//   expect(rabbitMQWrapper.client.publish).toHaveBeenCalled();
// });
