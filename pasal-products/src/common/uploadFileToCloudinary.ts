import {ReadStream} from "fs";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

type resoureceType = "auto" | "image" | "video";

interface options {
    folder: string;
    resource_type: resoureceType;
}

// const uploadImageWithThumbnail = async (highQualityImage:ReadStream) => {
//     try {
//       const uploadResponse = await cloudinary.uploader.upload_large(highQualityImage, {
//         resource_type: 'image',
//         folder: 'your_folder_name', // Optional: If you want to organize the images in a specific folder in Cloudinary
//         transformation: [
//           { width: 40, height: 40, crop: 'fill' }, // This will create the thumbnail image
//         ],
//       });
  
//       // The response will contain the URLs for the high-quality image and the thumbnail
//       const { secure_url: largeSizeURL, eager } = uploadResponse;
//       const thumbnailURL = eager[0].secure_url;
  
//       // You can now send back the URLs to the frontend along with any other form data
//       return { largeSize: largeSizeURL, thumbnail: thumbnailURL };
//     } catch (error) {
//       console.error('Error uploading image with thumbnail:', error);
//       throw error;
//     }
//   };


