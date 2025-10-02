import { Router } from "express";
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  registerValidations,
  updateProfileAuthValidations,
} from "../middlewares/validations/auth.validations.js";
import { applyValidations } from "../middlewares/validator.js";
export const authRoutes = Router();

authRoutes.post(
  "/auth/register",
  registerValidations,
  applyValidations,
  register
);
authRoutes.post("/auth/login", login);

// authRoutes.use(authMiddleware);

authRoutes.get("/auth/profile", authMiddleware, getProfile);
authRoutes.put(
  "/auth/profile",
  authMiddleware,
  updateProfileAuthValidations,
  applyValidations,
  updateProfile
);
authRoutes.post("/auth/logout", authMiddleware, logout);
