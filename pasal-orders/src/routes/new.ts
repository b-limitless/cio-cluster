import mongoose from "mongoose";
import express, { Request, Response } from "express";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  OrderStatus,
} from "@pasal/common";
import { body } from "express-validator";
import { Product } from "../models/products";
import { Order } from "../models/orders";
const router = express.Router();

// Implementation of expiration lest say in 1 minute the card will be expires
// If user adding more and more product then the expiration date also need to update
// If the card is expire then It will publish again event that expiration expire
// And then the product item is get added to the product mode in product service
// If they removed the product manually then also order will publish the event that
// Product is removed from the order service and then remove product will get  add
// By the product id which data is published by the order event
//
router.post(
  "/api/orders/create",
  requireAuth,
  [
    body("productId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Please provide valid product id"),
    body("qty")
      .isFloat({ min: 1, max: 100 })
      .withMessage("Please provide quanity."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { productId, qty } = req.body;
    // Find the product by its id
    const product = await Product.findById(productId);

    if (!product) {
      throw new NotFoundError();
    }

    let orders;
    // If user id, product in inside the object and status is created
    // Then simply increase the item by 1
    // Find product by id
    //products: { $elemMatch: { id: productId } },
    const userOrderSession = await Order.find({
      userId: req.currentUser?.id,
      status: OrderStatus.Created,
    });

    // if orderFind
    if (userOrderSession.length > 0) {
      // Again check the product of the user
      // let orders = await Order.find({
      //   products: { $elemMatch: { id: productId } },
      //   userId: req.currentUser?.id,
      //   status: OrderStatus.Created,
      // })
      const { products }: { products: any } = userOrderSession[0];
      let i = 0;
      let sameProduct: boolean = false;
      while (products.length) {
        if (products.length === i) {
          break;
        }
        if (products[i]["id"] == productId) {
          sameProduct = true;
          products[i]["qty"] = products[i]["qty"] + qty;
          break;
        }

        i++;
      }

      if (!sameProduct) {
        products.push({ id: productId, qty });
      }
      // Update the document by
      orders = await Order.findOneAndUpdate(
        { userId: req.currentUser?.id, status: OrderStatus.Created },
        { $set: { products: products } },
        { new: true, useFindAndModify: false }
      );

      if (orders) {
        console.log("Document is updated");
      }
    } else {
      // Build new order with new userid and _id
      orders = Order.build({
        userId: req.currentUser?.id || "",
        status: OrderStatus.Created,
        expiresAt: new Date(),
        products: [{ id: productId, qty: qty }],
      });
      await orders.save();
      //console.log(order)
    }
    //console.log(findOrders);
    res.status(201).json(orders);
  }
);

router.post(
  "/api/orders/v1",
  requireAuth,
  // [
  //   body("productId")
  //     .not()
  //     .isEmpty()
  //     .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
  //     .withMessage("Please provide valid product id"),
  //   body("qty")
  //     .isFloat({ min: 1, max: 100 })
  //     .withMessage("Please provide quanity."),
  // ],
  // validateRequest,
  async (req: Request, res: Response) => {
    const {productId, qty} = req.body;

    try {
      const product = await Product.find();

      // if(!product) {
      //   throw new Error("Unable to find product");
      // }
      return res.send(product);

    } catch(err) {
      console.log(err);
    }
    


    

    res.send("Working on it")
  }
);

export { router as orderNewRouter };
