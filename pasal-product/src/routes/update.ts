import {
  hasPermissions,
  rabbitMQWrapper,
  requireAuth,
  validateRequest,
} from "@pasal/common";
import logger from "@pasal/common/build/logger";
import express, { Request, Response } from "express";
import { febricBodyRequest } from "../body-request/FebricBodyRequest";
import { FebricUpdatedPublisher } from "../events/publishers/febric-updated-publisher";
import { FebricService } from "../services/FebricService";

const router = express.Router();

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

export {router as updateFebricRouter};
