import {
    hasPermissions,
    rabbitMQWrapper,
    requireAuth
} from "@pasal/common";
import logger from "@pasal/common/build/logger";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { FebricDeletedPublisher } from "../events/publishers/febric-deleted-publisher";
import { FebricService } from "../services/FebricService";

const router = express.Router();

router.delete(
  "/api/products/v1/:id",
  requireAuth,
  // hasPermissions(["create_febric"]),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleteFebric = await FebricService.findByIdAndDelete(id);
      res.status(200).send(deleteFebric);
      // Publish the event that febric is deleted
      const febricId = new mongoose.Types.ObjectId(id);
      try {
        new FebricDeletedPublisher(rabbitMQWrapper.client).publish({
          febricId,
        });
      } catch (err) {
        logger.log("error", "could not publish febric deleted event");
      }
      return;
    } catch (err) {
      logger.log("error", "Could not create febric");
      throw new Error("Could not create febric");
    }
  }
);

export {router as deleteFebricRouter};