import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createGroup,
  getGroupDetails,
  updateGroup,
  deleteGroup,
  addMemberToGroup,
  removeMemberFromGroup,
  leaveGroup,
  updateMemberRole,
} from "../controllers/groupController";

const router = express.Router();

router.get("/get-group-details", authMiddleware, getGroupDetails);
router.post("/create-group", authMiddleware, createGroup);
router.post("/update-group", authMiddleware, updateGroup);
router.post("/delete-group", authMiddleware, deleteGroup);
router.post("/add-member-to-group", authMiddleware, addMemberToGroup);
router.post("/remove-member-from-group", authMiddleware, removeMemberFromGroup);
router.post("/leave-group", authMiddleware, leaveGroup);
router.post("/update-member-role", authMiddleware, updateMemberRole);

export default router;
