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

//routes

router.post("/login",adminLogin);
router.get("/dashboard",authMiddleware,adminMiddleware,getUsers);
router.get("/dashboard/search",authMiddleware,adminMiddleware,searchUsers);
router.post("/dashboard",authMiddleware,adminMiddleware,addUser)
router.put("/dashboard/:id",authMiddleware,adminMiddleware,updateUser);
router.delete("/dashboard/:id",authMiddleware,adminMiddleware,deleteUser);

export default router;