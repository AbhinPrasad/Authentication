import express from "express";
import { userSignup } from "../controllers/authController.js";
const router = express.Router();

router.post("/", userSignup);

export default router;
