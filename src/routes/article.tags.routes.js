import { Router } from "express";
import {
  addTagToArticle,
  removeTagFromArticle,
} from "../controllers/articles_tags.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { articleOwnerAdminMiddleware } from "../middlewares/ownerOrAdmin.middleware.js";
export const tagArticleRoutes = Router();

tagArticleRoutes.post(
  "/articles/:articleId/tags/:tagId",
  authMiddleware,
  articleOwnerAdminMiddleware,
  addTagToArticle
);
tagArticleRoutes.delete(
  "/articles/:articleId/tags/:tagId",
  authMiddleware,
  articleOwnerAdminMiddleware,
  removeTagFromArticle
);
