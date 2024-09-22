import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../Config/cloudinary.mjs";


// Cloudinary storage configuration with multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // The folder in Cloudinary where images will be stored
    format: async (req, file) => "jpg", // Supports promises as well
    public_id: (req, file) => file.originalname.split(".")[0], // Use the file name (without extension) as the public ID
  },
});

const upload = multer({ storage });
export default upload;
