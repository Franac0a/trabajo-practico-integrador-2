import { validationResult } from "express-validator";

export const applyValidations = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.mapped);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  next();
};
