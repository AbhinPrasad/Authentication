import express from "express";
import { userLogin, userSignup } from "../controllers/authController.js";
const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);

export default router;
