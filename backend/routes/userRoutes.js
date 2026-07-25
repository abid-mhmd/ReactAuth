import express from "express";
import { register, loginUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getProfile,
  logoutUser,
  updateProfile,
  uploadProfileImage,
} from "../controllers/userController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

//Routes

router.post("/register", register);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.post("/logout", logoutUser);
router.put(
  "/profile/image",
  authMiddleware,
  upload.single("profileImage"),
  uploadProfileImage,
);

export default router;
