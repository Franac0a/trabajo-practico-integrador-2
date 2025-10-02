import { userModel } from "../models/user.models.js";
import { articleModel } from "../models/article.model.js";
import { commentModel } from "../models/comment.model.js";
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().populate({
      path: "articles",
      select: "title status",
    });

    res.status(200).json({ ok: true, data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error en el servidor",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel
      .findById(id)
      .populate("articles")
      .populate("comments");

    res.status(200).json({ ok: true, data: user });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error en el servidor",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, profile } = req.body;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        username,
        profile,
        email,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ ok: true, msg: "actualizado correctamente", updatedUser });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error en el servidor",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);

    res
      .status(200)
      .json({ ok: true, msg: "eliminado correctamente", data: deletedUser });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error en el servidor",
      error: error.message,
    });
  }
};
