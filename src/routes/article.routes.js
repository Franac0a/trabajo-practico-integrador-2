import { Router } from "express";
import {
  createArticle,
  getAllArticles,
  getArticleUser,
  getArticlesById,
  updatedArticle,
  deleteArticle,
} from "../controllers/articles.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { articleOwnerAdminMiddleware } from "../middlewares/ownerOrAdmin.middleware.js";
import { applyValidations } from "../middlewares/validator.js";
import {
  createArticleValidations,
  updateArticleValidations,
} from "../middlewares/validations/article.validations.js";
import { verifyId } from "../middlewares/validations/article.validations.js";
export const articleRoutes = Router();

articleRoutes.post(
  "/articles",
  authMiddleware,
  createArticleValidations,
  applyValidations,
  createArticle
);
articleRoutes.get("/articles", authMiddleware, getAllArticles);
articleRoutes.get("/articles/my", authMiddleware, getArticleUser);
articleRoutes.get(
  "/articles/:id",
  authMiddleware,
  verifyId,
  applyValidations,
  getArticlesById
);
articleRoutes.put(
  "/articles/:id",
  authMiddleware,
  articleOwnerAdminMiddleware,
  updateArticleValidations,
  applyValidations,
  updatedArticle
);
articleRoutes.delete(
  "/articles/:id",
  authMiddleware,
  articleOwnerAdminMiddleware,
  verifyId,
  applyValidations,
  deleteArticle
);
