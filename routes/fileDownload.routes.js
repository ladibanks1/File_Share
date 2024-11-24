import { Router } from "express";
import fileController from "../controller/file.controller.js";

const router = Router()


router.get("/:id" , fileController.downloadFile)




export default router