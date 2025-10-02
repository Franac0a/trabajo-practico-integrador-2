import { matchedData } from "express-validator";
import { articleModel } from "../models/article.model.js";

export const createArticle = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });
    const userId = req.user.id;
    console.log(data);
    const newArticle = await articleModel.create({
      ...data,
      author: userId,
    });

    return res.status(201).json({
      ok: true,
      msg: "Artículo creado correctamente",
      data: newArticle,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
      error: error.message,
    });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const articles = await articleModel
      .find()
      .populate("author", "username email")
      .populate("tags", "name description");

    res.status(200).json({ ok: true, data: articles });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error en el servidor",
      error: error.message,
    });
  }
};

export const getArticlesById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await articleModel
      .findById(id)
      .populate("author", " username email role")
      .populate("tags", " name description")
      .populate("comments", "content");
    res.status(200).json({ ok: true, data: article });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error en el servidor",
      error: error.message,
    });
  }
};

export const getArticleUser = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log("Usuario logueado:", req.user.id);
    const articles = await articleModel.find({ author: userId });
    // console.log("Artculos encontrados:", articles);
    res.status(200).json({ ok: true, data: articles });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error en el servidor",
      error: error.message,
    });
  }
};

export const updatedArticle = async (req, res) => {
  const { id } = req.params;
  const { title, excerpt, content, status } = req.body;
  try {
    const updatedArticle = await articleModel.findByIdAndUpdate(id, {
      title,
      excerpt,
      status,
      content,
    });

    res
      .status(200)
      .json({ ok: true, msg: "articulo actualizado", data: updatedArticle });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error en el servidor",
      error: error.message,
    });
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArticle = await articleModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ ok: true, msg: "articulo eliminado", data: deletedArticle });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error en el servidor",
      error: error.message,
    });
  }
};
