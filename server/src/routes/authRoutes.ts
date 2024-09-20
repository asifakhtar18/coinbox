import express from "express";
import {
  register,
  login,
  verifyEmail,
  resendOtp,
  forgotPassword,
  resetPassword,
  getUserDetails,
} from "../controllers/authControllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/user-details", authMiddleware, getUserDetails);
router.post("/register", register);
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/resend-email", resendOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
