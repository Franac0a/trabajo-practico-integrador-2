import { body, param } from "express-validator";
import { tagModel } from "../../models/tag.model.js";
import mongoose from "mongoose";

export const createTagValidations = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("el nombre solo puede tener de entre 2 a 30 caracteres")
    .custom(async (name) => {
      const existingName = await tagModel.findOne({ name });
      if (existingName) {
        throw new Error("ya existe una etiqueta con este nombre");
      }
      return true;
    }),
  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("la descripcion solo puede tener 200 caracteres"),
];
export const updateTagValidations = [
  body("name")
    .trim()
    .optional()
    .custom(async (name) => {
      const existingName = await tagModel.findOne({ name });
      if (existingName) {
        throw new Error("ya existe una etiqueta con este nombre");
      }
      return true;
    }),
  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("la descripcion solo puede tener 200 caracteres"),
];

export const verifyIdTags = [
  param("id")
    .custom(async (id) => {
      const existingTag = await tagModel.findById(id);
      if (!existingTag) {
        throw new Error("el id del tag no existe en la bd");
      }
      return true;
    })
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("el id no tiene formato valido"),
];
