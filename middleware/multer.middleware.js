import multer from "multer";
import storage from "../config/cloudinary.config.js";

const upload = multer({
  storage,
  limits: {
    fieldSize: 1024 * 1024 * 20,
  },
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
});

export default upload.array("files", 10);
