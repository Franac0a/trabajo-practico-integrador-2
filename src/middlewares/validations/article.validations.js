import { body, param } from "express-validator";
import { articleModel } from "../../models/article.model.js";
export const createArticleValidations = [
  body("title")
    .isString()
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),
  body("content")
    .isString()
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),
  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El excerpt no puede superar los 500 caracteres"),
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El status debe ser published o archived"),
];

export const updateArticleValidations = [
  body("title")
    .optional()
    .isString()
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),
  body("content")
    .optional()
    .isString()
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),
  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El excerpt no puede superar los 500 caracteres"),
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El status debe ser published o archived"),
];

export const verifyId = [
  param("id").custom(async (id) => {
    const existingArticle = await articleModel.findById(id);
    if (!existingArticle) {
      throw new Error("El articulo no existe en la base de datos");
    }
  }),
];
