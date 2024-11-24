import { Router } from "express";
import authController from "../controller/auth.controller.js";

const router = Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);

export default router;
