import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import {createServer} from 'http'

// routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import messagesRoutes from "./routes/messages.routes.js";
import matchRoutes from "./routes/match.routes.js";
import { connectDB } from "./config/db.js";
import { initializeSocket } from "./socket/socket.server.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

initializeSocket(httpServer);

app.use(express.json()); // Handles JSON payloads
app.use(express.urlencoded({ extended: true })); // Handles URL-encoded payloads
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/messages", messagesRoutes);
app.use("/api/v1/matches", matchRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist","index.html"))
  })
}

httpServer.listen(
  PORT,
  () => console.log(`Server is Listening on ${PORT} port`),
  connectDB()
);
