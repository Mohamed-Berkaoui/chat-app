import "dotenv/config.js";
import dbConnect from "./config/DbConnect.js";
import authRouter from "./routes/auth.js";
import messageRouter from "./routes/message.js";
import { AppError, AppFail } from "./config/Responces.js";
import cors from "cors";
import {app,server} from "./config/socket.js"
import express from "express"


app.use(express.json());
app.use(cors());

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
