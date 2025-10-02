import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies["token"];

    if (!token) {
      return res
        .status(401)
        .json({ message: "no autenticado para realizar esta accion" });
    }

    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error en el middleware de autenticacion",
      error: error.message,
    });
  }
};
