import { application, Router } from "express";

import {
  createComment,
  getCommentArticle,
  getCommentUser,
  updateComment,
  deleteComment,
} from "../controllers/comments.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { applyValidations } from "../middlewares/validator.js";
import {
  createCommentValidations,
  verifyId,
  updateCommentValidations,
} from "../middlewares/validations/comment.validations.js";
import { commentOwnerAdminMiddleware } from "../middlewares/ownerOrAdmin.middleware.js";
export const commentRoutes = Router();

commentRoutes.post(
  "/comments",
  authMiddleware,
  createCommentValidations,
  applyValidations,
  createComment
);
commentRoutes.get(
  "/comments/articles/:articleId",
  authMiddleware,
  verifyId,
  applyValidations,
  getCommentArticle
);
commentRoutes.get("/comments/my", authMiddleware, getCommentUser);
commentRoutes.put(
  "/comments/:id",
  authMiddleware,
  updateCommentValidations,
  verifyId,
  applyValidations,
  updateComment
);
commentRoutes.delete(
  "/comments/:id",
  authMiddleware,
  commentOwnerAdminMiddleware,
  verifyId,
  applyValidations,
  deleteComment
);
