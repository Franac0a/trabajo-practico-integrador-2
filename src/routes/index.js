import { Router } from "express";
import { userRoutes } from "./user.routes.js";
import { authRoutes } from "./auth.routes.js";
import { tagRoutes } from "./tag.routes.js";
import { articleRoutes } from "./article.routes.js";
import { commentRoutes } from "./comment.routes.js";
import { tagArticleRoutes } from "./article.tags.routes.js";
export const routes = Router();

routes.use(userRoutes);
routes.use(authRoutes);
routes.use(tagRoutes);
routes.use(articleRoutes);
routes.use(commentRoutes);
routes.use(tagArticleRoutes);
