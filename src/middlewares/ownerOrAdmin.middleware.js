import { articleModel } from "../models/article.model.js";
import { commentModel } from "../models/comment.model.js";

export const commentOwnerAdminMiddleware = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const comment = await commentModel.findById(id);

    if (!comment) {
      return res.status(404).json({ msg: "commentario no encontrado" });
    }

    if (user.role === "admin" || comment.author.toString() === user.id) {
      return next();
    }

    return res
      .status(403)
      .json({ ok: false, msg: "no tienes acceso a este recurso" });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "error interno en el servidor ",
    });
  }
};

export const articleOwnerAdminMiddleware = async (req, res, next) => {
  const user = req.user;
  const { articleId } = req.params;
  try {
    const article = await articleModel.findById(articleId);

    if (!article) {
      return res.status(404).json({ msg: "articulo no encontrado" });
    }

    if (user.role === "admin" || article.author.toString() === user.id) {
      return next();
    }

    return res
      .status(403)
      .json({ ok: false, msg: "no tienes acceso a este recurso" });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "error interno en el servidor ",
      error: error.message,
    });
  }
};
