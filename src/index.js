import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();
app

//middleware for cookie authentication
app.use(cookieParser());
app.use(express.json({ limit: "10mb" })); // Increase the limit
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//api routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
