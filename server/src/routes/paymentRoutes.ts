import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  addPaymentStatus,
  getPaymentDetails,
} from "../controllers/paymentController";

const router = Router();

router.post("/get-payment-details", authMiddleware, getPaymentDetails);
router.post("/add-payment-status", authMiddleware, addPaymentStatus);

export default router;
