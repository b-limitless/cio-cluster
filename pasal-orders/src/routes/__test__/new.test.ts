import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Product } from "../../models/products";
import { sign } from "jsonwebtoken";

interface ProductsInterface {
  id: string;
  qty: number;
}

it("will throw 401 unauthorized error, while user is not authenticated", async () => {
  await request(app).post("/api/orders/v1").send({}).expect(401);
});

it("will throw bad request error if no product id and quantity is provided", async () => {
  const response = await request(app)
    .post("/api/orders/v1")
    .set("Cookie", global.signin())
    .send({})
    .expect(400);

  const parseErrors = JSON.parse(response.text);
  expect(parseErrors.errors.length).toEqual(3);
});

it("throw 400 bad request error while providing invalid product id", async () => {
  const response = await request(app)
    .post("/api/orders/v1")
    .set("Cookie", global.signin())
    .send({ productId: "abc" })
    .expect(400);

  const parseErrors = JSON.parse(response.text);
  expect(parseErrors.errors.length).toEqual(2);
});

it("throw 400 bad request error while providing qty", async () => {
  const response = await request(app)
    .post("/api/orders/v1")
    .set("Cookie", global.signin())
    .send({ productId: mongoose.Types.ObjectId().toString() })
    .expect(400);
  const parseErrors = JSON.parse(response.text);
  expect(parseErrors.errors.length).toEqual(1);
});

it("throw 400 bad request error while providing invalid quty", async () => {
  const response = await request(app)
    .post("/api/orders/v1")
    .set("Cookie", global.signin())
    .send({ productId: mongoose.Types.ObjectId().toString(), qty: "hello" })
    .expect(400);
  const parseErrors = JSON.parse(response.text);
  expect(parseErrors.errors.length).toEqual(1);
});

it("will throw 404 error, while product is not found", async () => {
  await request(app)
    .post("/api/orders/v1")
    .send({ productId: mongoose.Types.ObjectId().toHexString(), qty: 1 })
    .set("Cookie", global.signin())
    .expect(404);
});

it("will create the product and, will create the order with status 201", async () => {
  // You dont need to have /new path post will always create the
  // Product, While refactoring just remove the new path
  const singin = global.signin();
  const product = Product.build({
    userId: mongoose.Types.ObjectId().toHexString(),
    name: "coat",
    category: "cloth",
    subCategory: "cloth",
    price: 100,
    availableItems: 100,
  });
  const product1 = Product.build({
    userId: mongoose.Types.ObjectId().toHexString(),
    name: "coat",
    category: "cloth",
    subCategory: "cloth",
    price: 100,
    availableItems: 100,
  });

  const product2 = Product.build({
    userId: mongoose.Types.ObjectId().toHexString(),
    name: "coat3",
    category: "cloth3",
    subCategory: "cloth3",
    price: 100,
    availableItems: 100,
  });


  await product.save();
  await product1.save();
  const order1 = await request(app)
    .post("/api/orders/v1")
    .send({ productId: product.id, qty: 1 })
    .set("Cookie", singin)
    .expect(201);
  expect(order1.body.products.length).toEqual(1);

  const order2 = await request(app)
    .post("/api/orders/v1")
    .send({ productId: product1.id, qty: 10 })
    .set("Cookie", singin)
    .expect(201);

  expect(order2.body.products.length).toEqual(2);

  // Send the request with the same products id
  const order3 = await request(app)
    .post("/api/orders/v1")
    .send({ productId: product.id, qty: 1 })
    .set("Cookie", singin)
    .expect(201);

  const { products } = order3.body;
  expect(products.length).toEqual(2);

  const firstProduct = products.filter((pdk: ProductsInterface) => {
    if (pdk.id === product.id) return true;
    return false;
  });

  expect(firstProduct[0].qty).toEqual(2);

  // Create third prodcut order 
//   const order4 = await request(app)
//     .post("/api/orders/v1")
//     .send({ productId: product2.id, qty: 1 })
//     .set("Cookie", singin)
//     .expect(201);
const findByID = await Product.findById(product1.id);
if(!findByID) {
    console.log('No Product found')
}
const findAll = await Product.find({});

console.log(product2);
console.log(findAll);

});
