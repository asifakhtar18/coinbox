import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getFriendListController,
  sendFriendRequestController,
  acceptFriendRequestController,
  declineFriendRequestController,
  deleteFriendController,
  searchUserController,
} from "../controllers/userConnectionController";

const router = express.Router();

router.get("/search-user", authMiddleware, searchUserController);
router.get("/get-friend-list", authMiddleware, getFriendListController);
router.post(
  "/send-friend-request",
  authMiddleware,
  sendFriendRequestController
);
router.post(
  "/accept-friend-request",
  authMiddleware,
  acceptFriendRequestController
);
router.post(
  "/decline-friend-request",
  authMiddleware,
  declineFriendRequestController
);

router.delete("/delete-friend", authMiddleware, deleteFriendController);

export default router;
