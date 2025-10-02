import { tagModel } from "../models/tag.model.js";

export const createTag = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newTag = await tagModel.create({
      name: name,
      description: description,
    });

    res
      .status(201)
      .json({ ok: true, msg: "etiqueta creada corrextamente", data: newTag });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error en el servidor",
      error: error.message,
    });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await tagModel.find();

    res.status(200).json({ ok: true, data: tags });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error en el servidor",
      error: error.message,
    });
  }
};

export const getTagsById = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await tagModel.findById(id).populate("articles");

    res.status(200).json({ ok: true, data: tag });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error en el servidor",
      error: error.message,
    });
  }
};

export const updateTag = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedTag = await tagModel.findByIdAndUpdate(id, {
      name: name,
      description: description,
    });
    res
      .status(200)
      .json({ ok: true, msg: "tag actualizada", data: updatedTag });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error en el servidor",
      error: error.message,
    });
  }
};

export const deleteTag = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTag = await tagModel.findByIdAndDelete(id);
    res.status(200).json({ sok: true, msg: "tag eliminada", data: deletedTag });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error en el servidor",
      error: error.message,
    });
  }
};
