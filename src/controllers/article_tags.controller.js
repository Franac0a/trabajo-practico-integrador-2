import { tagModel } from "../models/tag.model.js";
import { articleModel } from "../models/article.model.js";

export const addTagToArticle = async (req, res) => {
  const { articleId, tagId } = req.params;
  try {
    const article = await articleModel.findById(articleId);

    const tag = await tagModel.findById(tagId);
    if (!tag)
      return res.status(404).json({ ok: false, msg: "etiqueta no encontrada" });

    if (article.tags.includes(tagId)) {
      return res.status(400).json({ ok: false, msg: "etiqueta ya asignada" });
    }

    article.tags.push(tagId);
    await article.save();
    return res
      .status(200)
      .json({ ok: true, msg: "etiqueta agregada", data: article });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "error en el servidor", error: error.message });
  }
};

export const removeTagFromArticle = async (req, res) => {
  try {
    const { articleId, tagId } = req.params;

    const tag = await tagModel.findById(tagId);
    if (!tag)
      return res.status(404).json({ ok: false, msg: "etiqueta no encontrada" });

    const article = await articleModel
      .findByIdAndUpdate(articleId, { $pull: { tags: tagId } }, { new: true })
      .populate("author tags");

    if (!article) {
      return res.status(404).json({ error: "Artículo no encontrado" });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
