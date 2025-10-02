import { Router } from "express";

import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
export const userRoutes = Router();

// userRoutes.use(authMiddleware);
// userRoutes.use(adminMiddleware);

userRoutes.put("/auth/users/:id", authMiddleware, adminMiddleware, updateUser);
userRoutes.get("/auth/users", authMiddleware, adminMiddleware, getAllUsers);
userRoutes.get("/auth/users/:id", authMiddleware, adminMiddleware, getUserById);
userRoutes.delete(
  "/auth/users/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);
