import { body, param } from "express-validator";
import { userModel } from "../../models/user.models.js";

export const registerValidations = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El username es obligatorio")
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "el username debe de tener un minimo de 3 caracteres y un  maximo de 20"
    )
    .isAlphanumeric()
    .withMessage("el username debe de ser alfanumerico")
    .custom(async (username) => {
      const existingUsername = await userModel.findOne({ username });
      if (existingUsername) {
        throw new Error("ya existe un user con ese nombre");
      }
      return true;
    }),

  body("email")
    .trim()
    .isEmail()
    .withMessage("el email debe de tener un formato valido")
    .custom(async (email) => {
      const existingEmail = await userModel.findOne({ email });
      if (existingEmail) {
        throw new Error("ya existe un user con ese email");
      }
      return true;
    }),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("la password es obligatoria")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 0,
    }),
  body("role")
    .trim()
    .optional()
    .isIn(["user", "admin"])
    .withMessage("el rol solo puede ser admin o user"),

  body("profile.firstName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .matches(/^[A-Za-z]+$/)
    .withMessage("el firstName solo puede contener letras"),

  body("profile.lastName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .matches(/^[A-Za-z]+$/)
    .withMessage("el lastName solo puede contener letras"),
  body("biography")
    .trim()
    .optional()
    .isLength({ max: 500 })
    .withMessage("la biografia no debe de superar los 500 caracteres"),
  body("avatarUrl")
    .trim()
    .optional()
    .isURL()
    .withMessage("el avatar debe de tener una url valida"),
];

export const updateProfileAuthValidations = [
  body("firstName")
    .trim()
    .optional()
    .isLength({ min: 2, max: 50 })
    .isString()
    .withMessage("el firstName solo puede contener letras"),

  body("lastName")
    .trim()
    .optional()
    .isLength({ min: 2, max: 50 })
    .isString()
    .withMessage("el lastName solo puede contener letras"),
  body("biography")
    .trim()
    .optional()
    .isLength({ max: 500 })
    .withMessage("la biografia no debe de superar los 500 caracteres"),
  body("avatarUrl")
    .trim()
    .optional()
    .isURL()
    .withMessage("el avatar debe de tener una url valida"),
];
