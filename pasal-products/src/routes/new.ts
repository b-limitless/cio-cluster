// Since we are developing in isolate model
// Any event which is listening and publishing visa RabbitMQ has been disabled
// So that we can develop fast few features which RabbitMQ does not required
// We will have to keep the copy of state in each services 
// For example in User Service, Febric model should be available 
// In Product Service - Febric, User model should be present and 
// As soon as User is created it must publish the event and store the data
import { NotAuthorizedError, hasPermissions, requireAuth, validateRequest } from "@pasal/common";
import express, { Request, Response } from "express";
import { febricBodyRequest } from "../body-request/FebricBodyRequest";
import { FebricService } from "../servies/FebricService";
import logger from "@pasal/common/build/logger";



const router = express.Router();

router.post(
  "/api/products/v1",
  requireAuth,
  hasPermissions(["create_febric"]),
  febricBodyRequest,
  validateRequest, 
  async (req: Request, res: Response) => {
    // if(!req.currentUser) {
    //   throw new NotAuthorizedError();
    // }
    const { 
      title, 
      price,
      deliveryTime, 
      excellence, 
      warmth, 
      weight, 
      season, 
      threadStyle, 
      brightness, 
      superShiny, 
      material, 
      tone, 
      threadCount,
      opacity, 
      waterproof,
      stretchyText, 
      stretchy,
      mis, 
      type, 
      febricTypes, 
      febricSeasons, 
      threadTypes, 
      threadCounts, 
      characters,
      thumbnailImageUrl,
      originalImageUrl} = req.body;
    
    
    const userId = req?.currentUser?.id;
    try {
      const febric = await FebricService.build({userId, 
        title, 
        price,
        deliveryTime, 
        excellence, 
        warmth, 
        weight, 
        season, 
        threadStyle, 
        brightness, 
        superShiny, 
        material, 
        tone, 
        threadCount,
        opacity, 
        waterproof,
        stretchyText, 
        stretchy,
        mis, 
        type, 
        febricTypes, 
        febricSeasons, 
        threadTypes, 
        threadCounts, 
        characters,
        thumbnailImageUrl,
        originalImageUrl});
      res.status(201).send(febric);
      return;
    } catch(err) {
      logger.log("error", "Could not create febric");
      throw new Error("Could not create febric"); 
    }
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

// Delete the febric based on id
router.patch(
  "/api/products/v1/:id",
  requireAuth,
  hasPermissions(["create_febric"]),
  febricBodyRequest,
  validateRequest, 
  async (req: Request, res: Response) => {
    const { 
      title, 
      price,
      deliveryTime, 
      excellence, 
      warmth, 
      weight, 
      season, 
      threadStyle, 
      brightness, 
      superShiny, 
      material, 
      tone, 
      threadCount,
      opacity, 
      waterproof,
      stretchyText, 
      stretchy,
      mis, 
      type, 
      febricTypes, 
      febricSeasons, 
      threadTypes, 
      threadCounts, 
      characters,
      thumbnailImageUrl,
      originalImageUrl} = req.body;
    
    const {id} = req.params;
    try {
      const febric = await FebricService.findByIdAndUpdate(id, {
        title, 
        price,
        deliveryTime, 
        excellence, 
        warmth, 
        weight, 
        season, 
        threadStyle, 
        brightness, 
        superShiny, 
        material, 
        tone, 
        threadCount,
        opacity, 
        waterproof,
        stretchyText, 
        stretchy,
        mis, 
        type, 
        febricTypes, 
        febricSeasons, 
        threadTypes, 
        threadCounts, 
        characters,
        thumbnailImageUrl,
        originalImageUrl}, {new:true});
      res.status(201).send(febric);
      return;
    } catch(err) {
      logger.log("error", "Could not create febric");
      throw new Error("Could not create febric"); 
    }
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
    
    
  }
);

router.delete(
  "/api/products/v1/:id",
  requireAuth,
  hasPermissions(["create_febric"]), 
  async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
      const deleteFebric = await FebricService.findByIdAndDelete(id);
      res.status(200).send(deleteFebric);
      return;
    } catch(err) {
      logger.log("error", "Could not create febric");
      throw new Error("Could not create febric"); 
    }
    
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
  }
);
export { router as createProductRouter };
