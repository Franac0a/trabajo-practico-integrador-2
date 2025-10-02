import { matchedData } from "express-validator";
import { commentModel } from "../models/comment.model.js";

export const createComment = async (req, res) => {
  const data = matchedData(req, { locations: "body" });
  const userId = req.user.id;

  try {
    const newContent = await commentModel.create({
      content: data.content,
      author: userId,
      article: data.article,
    });
    console.log(newContent);
    res.status(201).json({
      ok: true,
      msg: "comment creado correctamente",
      data: newContent,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error en el servidor",
      error: error.message,
    });
  }
};

export const getCommentArticle = async (req, res) => {
  const { articleId } = req.params;
  try {
    const comments = await commentModel
      .find({ article: articleId })
      .populate("author", "username email");
    console.log(comments);

    return res.status(200).json({
      ok: true,
      message: "Comentarios:",
      Comments: comments,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "error interno en el servidor",
    });
  }
};
export const getCommentUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const comment = await commentModel
      .find({ author: userId })
      .populate("author", "username email");

    res.status(200).json({ ok: true, data: comment });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error en el servidor",
      error: error.message,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const data = matchedData(req, { locations: "body" });
    console.log(data);

    const updatedComment = await commentModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      ok: true,
      msg: "comentario actualizado correctamente",
      data: updatedComment,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error en el servidor",
      error: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await commentModel.findByIdAndDelete(id);
    res.status(200).json({ ok: true, msg: "commentario borrado" });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error en el servidor",
      error: error.message,
    });
  }
};
