export const adminMiddleware = async (req, res, next) => {
  try {
    //viene del middleware de auth el req.user
    const user = req.user;
    if (user.role !== "admin") {
      return res.status(403).json({
        ok: false,
        message: "Usuario no auntenticado para realizar esta operacion",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "error interno en el servidor" });
  }
};
