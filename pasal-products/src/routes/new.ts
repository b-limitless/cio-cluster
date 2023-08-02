import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, requireAuth, Subjects, OrderStatus, hasPermissions, BadRequestError } from "@pasal/common";
import { Febric } from "../models/febric";
import { ProductCreatedPublisher } from "../events/publishers/product-created-publisher";
import { rabbitMQWrapper } from "@pasal/common";
import { febricBodyRequest } from "../body-request/FebricBodyRequest";
import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import streamifier from "streamifier";
import fs from "fs";
import {promisify} from "util";
const writeFileAsync = promisify(fs.writeFile);

const router = express.Router();
const upload = multer();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

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
    if (!req.file) {
      throw new Error('Please select a file');
    }

    const uploadedFile = req.file;

    // create file path 
    const filePath = `/tmp/${uploadedFile.filename}`;

    try {
      await writeFileAsync(filePath, uploadedFile.buffer);
    } catch(err) {
      throw new Error(`Could not upload the file ${err}`);
    }
    // Convert buffer to readable stream using streamifier
   // const stream = streamifier.createReadStream(uploadedFile.buffer);

  
    // Upload the original image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, { folder: 'images/' });

    // Use Cloudinary SDK to generate the thumbnail
    const thumbnailResult = await cloudinary.uploader.upload(filePath, {
      folder: 'thumbnails/',
      transformation: { width: 40, height: 40, crop: 'fill' },
    });

    // Get the URLs for the original and thumbnail images
    const originalImageUrl = uploadResult.secure_url;
    const thumbnailImageUrl = thumbnailResult.secure_url;

    // Send the URLs back to the client
    res.send({ originalImageUrl, thumbnailImageUrl });

    // Clean up: Remove the temporary file from /tmp
    fs.unlinkSync(filePath);

  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Error uploading image');
  }
});




export { router as createProductRouter };
