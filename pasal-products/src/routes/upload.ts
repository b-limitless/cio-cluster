import express from "express";
import fs from "fs";
import multer from "multer";
import { uploadFileToCloudinary } from "../common/uploadFileToCloudinary";
import logger from "@pasal/common/build/logger";

const router = express.Router();
const upload = multer();

router.post('/api/products/v1/upload', upload.single('image'), async (req, res) => {
    try {
      const {originalImageUrl, thumbnailImageUrl, filePath} = await uploadFileToCloudinary("ABC", req.file);
      res.send({originalImageUrl, thumbnailImageUrl, filePath});
      fs.unlinkSync(filePath);
      return;
    } catch(err) {
      res.status(404).send(`Something went wrong could not up ${err}`);
      logger.log("error", err);
    }
  });

  export {router as uploadeRouter}