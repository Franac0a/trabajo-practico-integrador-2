import { userModel } from "../models/user.models.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { matchedData } from "express-validator";

export const register = async (req, res) => {
  try {
    const data = matchedData(req, { locations: "body" });

    const hashedPassword = await hashPassword(data.password);
    const newUser = await userModel.create({
      ...data,
      password: hashedPassword,
    });
    if (newUser) {
      res.status(201).json({
        ok: true,
        msg: "usario creado correctamente",
        data: newUser,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, msg: "error en el servidor", error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ ok: false, msg: "credenciales incorrectas" });
    }
    const validatePassword = await comparePassword(password, user.password);
    if (!validatePassword) {
      return res
        .status(401)
        .json({ ok: false, msg: "credenciales incorrectas" });
    }

    //crear token:
    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.json({ msg: "login exitoso" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "error en el servidor al loggear", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ msg: "logout exitoso" });
  } catch (error) {
    res.status(500).json({
      msg: "error en el servidor al cerrar sesion",
      error: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user;

    const userProfile = await userModel
      .findOne({ _id: user.id })
      .select("-password");

    if (!user) {
      return res.status(401).json({ msg: "user no encontrado" });
    }

    return res.status(200).json({ ok: true, data: userProfile });
  } catch (error) {
    res.status(500).json({
      msg: "Error en el servidor al obtener el perfil",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = matchedData(req, { locations: "body" });
    console.log(data);

    const updatedProfile = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: { profile: data }, //actualiza solo los campos recibidos
      },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      msg: "usuario actualizado correctamente",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Server error", error);
    return res.status(500).json({
      ok: false,
      message: "Error en el servidor",
      error: error.message,
    });
  }
};
