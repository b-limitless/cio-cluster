import { hasPermissions, requireAuth, validateRequest } from "@pasal/common";
import express, { Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import { febricBodyRequest } from "../body-request/FebricBodyRequest";
import { uploadFileToCloudinary } from "../common/uploadFileToCloudinary";



const router = express.Router();
const upload = multer();

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




router.post('/api/products/v1/upload', upload.single('image'), async (req, res) => {
  try {
    const {originalImageUrl, thumbnailImageUrl, filePath} = await uploadFileToCloudinary("ABC", req.file);
    res.send({originalImageUrl, thumbnailImageUrl, filePath});
    fs.unlinkSync(filePath);
    return;
  } catch(err) {
    res.status(404).send(`Something went wrong could not up ${err}`);
    console.log(err);
  }
});




export { router as createProductRouter };
