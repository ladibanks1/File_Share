import { v2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "File_Share",
    public_id: (req, file) => file.originalname,
    resource_type: "auto",
  },
});

export { v2 as cloudinary };
export default storage;
