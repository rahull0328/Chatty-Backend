import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import messageRoutes from "./routes/message.route.js";

const app = express();

dotenv.config();
app.use(express.json());
//middleware for cookie authentication
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//api routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
