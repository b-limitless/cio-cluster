import { hasPermissions, requireAuth, validateRequest } from "@pasal/common";
import express, { Request, Response } from "express";
import { febricBodyRequest } from "../body-request/FebricBodyRequest";


const router = express.Router();

router.post(
  "/api/products/v1/new",
  requireAuth,
  hasPermissions(["create_febric"]),
  febricBodyRequest,
  validateRequest, 
  async (req: Request, res: Response) => {
    // try {
      
    //   new ProductCreatedPublisher(rabbitMQWrapper.client).publish({
    //     version: product.version,
    //     id: product.id,
    //     userId: product.userId,
    //     name: product.name,
    //     price: product.price,
    //     category: product.category,
    //     subCategory: product.subCategory,
    //     availableItems:availableItems
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
    
    
    // res.status(201).json(product);
    res.status(201).send({});
  }
);

// Define the route where the file will be uploaded


export { router as createProductRouter };
