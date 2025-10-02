import { body, param } from "express-validator";
import { commentModel } from "../../models/comment.model.js";
import mongoose from "mongoose";
import { userModel } from "../../models/user.models.js";
export const createCommentValidations = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .isLength({ min: 5, max: 500 })
    .withMessage("el contenido debe de tener de 5 a 500 caracteres"),

  body("author").custom(async (author) => {
    const existingAuthor = await userModel.findOne({ _id: author });
    if (!existingAuthor) {
      throw new Error("el autor no existe");
    }
    return true;
  }),

  body("article")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("el id debe de ser valido"),
];

export const updateCommentValidations = [
  body("content")
    .optional()
    .isLength({ min: 5, max: 500 })
    .withMessage("el contenido debe de tener de 5 a 500 caracteres"),
];

export const verifyId = [
  param("articleId")
    .custom(async (articleId) => {
      const existingComment = await commentModel.findById(articleId);
      if (!existingComment) {
        throw new Error("el comentario no existe en la base de datos");
      }
      return true;
    })
    .custom(async (articleId) => {
      if (!mongoose.Types.ObjectId.isValid(articleId)) {
        throw new Error("Formato de ID inválido");
      }
    }),
];
