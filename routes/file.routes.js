import { Router } from "express";
import fileController from "../controller/file.controller.js";
const router = Router();

router.post("/upload", fileController.uploadFile);
router.get("/history", fileController.history);

export default router;
