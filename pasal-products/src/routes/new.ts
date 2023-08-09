// Since we are developing in isolate model
// Any event which is listening and publishing visa RabbitMQ has been disabled
// So that we can develop fast few features which RabbitMQ does not required
// We will have to keep the copy of state in each services
// For example in User Service, Febric model should be available
// In Product Service - Febric, User model should be present and
// As soon as User is created it must publish the event and store the data
import {
  NotAuthorizedError,
  hasPermissions,
  requireAuth,
  validateRequest,
} from "@pasal/common";
import express, { Request, Response } from "express";
import { febricBodyRequest } from "../body-request/FebricBodyRequest";
import { FebricService } from "../servies/FebricService";
import logger from "@pasal/common/build/logger";
import { ProductCreatedPublisher } from "../events/publishers/product-created-publisher";
import { rabbitMQWrapper } from "@pasal/common";
import { FebricCreatedPublisher } from "../events/publishers/febric-created-publisher";
import { FebricUpdatedPublisher } from "../events/publishers/febric-updated-publisher";
import { FebricDeletedPublisher } from "../events/publishers/febric-deleted-publisher";
import mongoose from "mongoose";

const router = express.Router();

router.post(
  "/api/products/v1",
  requireAuth,
  // hasPermissions(["create_febric"]),
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
      originalImageUrl,
    } = req.body;

    const userId = new mongoose.Types.ObjectId(req?.currentUser?.id);
    try {
      const febric = await FebricService.build({
        userId,
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
        originalImageUrl,
      });
      res.status(201).send(febric);

      try {
        let { id, userId:uId } = febric;
        const febricId = new mongoose.Types.ObjectId(id);
        
        new FebricCreatedPublisher(rabbitMQWrapper.client).publish({
          febricId,
          userId,
          ...req.body,
        });
        logger.log("info", "product created event has been fired");
        logger.log("info", {febricId,
          userId,
          ...req.body})
      } catch (err) {
        console.log(err);
      }

      return;
    } catch (err) {
      logger.log("error", "Could not create febric");
      throw new Error("Could not create febric");
    }
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
      originalImageUrl,
    } = req.body;

    const { id } = req.params;
    try {
      const febric = await FebricService.findByIdAndUpdate(
        id,
        {
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
          originalImageUrl,
        },
        { new: true }
      );
      res.status(201).send(febric);
      // Publish an event that febric is updated

      try {
        new FebricUpdatedPublisher(rabbitMQWrapper.client).publish({
          febricId: id,
          ...req.body,
        });
        logger.log("info", "Febric updated event has been published");
      } catch (err) {
        logger.log("error", "Could not publish febric updated event");
      }
      return;
    } catch (err) {
      logger.log("error", "Could not create febric");
      throw new Error("Could not create febric");
    }
  }
);

router.delete(
  "/api/products/v1/:id",
  requireAuth,
  hasPermissions(["create_febric"]),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleteFebric = await FebricService.findByIdAndDelete(id);
      res.status(200).send(deleteFebric);
      // Publish the event that febric is deleted
      const febricId = new mongoose.Types.ObjectId(id);
      try {
        new FebricDeletedPublisher(rabbitMQWrapper.client).publish({
          febricId
        })
      } catch(err) {
        logger.log("error", "could not publish febric deleted event");
      }
      return;
    } catch (err) {
      logger.log("error", "Could not create febric");
      throw new Error("Could not create febric");
    }
  }
);
export { router as createProductRouter };
