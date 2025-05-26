import express from "express";
import "dotenv/config.js";
import dbConnect from "./config/DbConnect.js";
import authRouter from "./routes/auth.js";
import messageRouter from "./routes/message.js";
import { AppError, AppFail } from "./config/Responces.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(cors());
const io = new Server(server, {
  cors: { origin: ["http://localhost:5173"],methods:["GET","POST"], credentials: true },
});

io.on("connection", (socket) => {
  console.log(socket.id);
});
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

app.all("*any", function (req, res, next) {
  res.status(404).json(new AppFail("not found"));
});
app.use(function (e, req, res, next) {
  res.status(400).json(new AppError(e.message));
});

server.listen(process.env.PORT, function () {
  dbConnect();
  console.log("server started");
});
