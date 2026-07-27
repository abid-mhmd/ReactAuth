import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/authMiddleware.js";
import {
  adminLogin,
  getUsers,
  searchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/adminController.js";

const router=express.Router();

router.post("/login",adminLogin);
router.get("/users",authMiddleware,adminMiddleware,getUsers);
router.get("/users/search",authMiddleware,adminMiddleware,searchUsers);
router.post("/users",authMiddleware,adminMiddleware,addUser)
router.put("/users/:id",authMiddleware,adminMiddleware,updateUser);
router.delete("/users/:id",authMiddleware,adminMiddleware,deleteUser);

export default router;