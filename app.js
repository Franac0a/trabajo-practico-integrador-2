import express from "express";
import "dotenv/config";
import { connectDB } from "./src/config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//----------------RUTAS------------
import { routes } from "./src/routes/index.js";
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use("/api", routes);

app.listen(PORT, async () => {
  await connectDB();
  console.log("servidor corriendo en el puerto", PORT);
});
