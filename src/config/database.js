import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // await mongoose.connection.dropDatabase();
    console.log("conexion exitosa a la bd");
  } catch (error) {
    console.log("error al conectar con la base de datos", error);
  }
};
