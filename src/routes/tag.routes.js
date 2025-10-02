import { Router } from "express";

import {
  createTag,
  getAllTags,
  getTagsById,
  deleteTag,
  updateTag,
} from "../controllers/tags.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { applyValidations } from "../middlewares/validator.js";
import {
  createTagValidations,
  updateTagValidations,
  verifyIdTags,
} from "../middlewares/validations/tag.validations.js";
export const tagRoutes = Router();

tagRoutes.post(
  "/tags",
  authMiddleware,
  adminMiddleware,
  createTagValidations,
  applyValidations,
  createTag
);
tagRoutes.get("/tags", authMiddleware, adminMiddleware, getAllTags);
tagRoutes.get(
  "/tags/:id",
  authMiddleware,
  verifyIdTags,
  applyValidations,
  getTagsById
);
tagRoutes.put(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  updateTagValidations,
  verifyIdTags,
  applyValidations,
  updateTag
);
tagRoutes.delete(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  verifyIdTags,
  applyValidations,
  deleteTag
);
