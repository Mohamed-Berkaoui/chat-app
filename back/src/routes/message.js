import express from "express";
import { getAllUsers, getUserMessages, sendmessage } from "../controllers/message.js";
import { verifyUser } from "../middelwares/verifytoken.js";
const messageRouter = express.Router();

messageRouter.post("/sent-message/:id",verifyUser(), sendmessage);
messageRouter.get("/getusers",verifyUser(), getAllUsers);
messageRouter.get("/getMessages/:id",verifyUser(),getUserMessages)

export default messageRouter;