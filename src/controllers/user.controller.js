import { UserModel } from "../models/user.model.js";

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const traerUsuarioId = UserModel.findByPk();
  } catch (error) {
    return;
  }
};
