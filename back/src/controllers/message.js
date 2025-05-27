import { Types } from "mongoose";
import asyncHandler from "../config/asyncHandler.js";
import { AppFail, AppSuccess } from "../config/Responces.js";
import MessageModel from "../models/Message.js";
import UserModel from "../models/User.js";
import { getUserSocket, io } from "../config/socket.js";

export const sendmessage = asyncHandler(async (req, res) => {
  const message = req.body.message;
  if (!message) {
    return res.status(400).json(new AppFail("message cant be empty"));
  }
  const userReceiver = await UserModel.findById(req.params.id);
  if (!userReceiver) {
    return res.status(400).json(new AppFail("receiver not found!!"));
  }
  let sentmessage;
  try {
    sentmessage = await MessageModel.create({
      message: message,
      sender: req.user._id,
      receiver: userReceiver._id,
    });
    if (getUserSocket(userReceiver._id))
      io.to(getUserSocket(userReceiver._id)).emit('newMessage',sentmessage);
  } catch (error) {
    return res.status(400).json(new AppFail("something went wrong!!"));
  }

  res.json(new AppSuccess(sentmessage));
});
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find({ _id: { $ne: req.user._id } }).select(
    "-password"
  );
  res.json(new AppSuccess(users));
});

export const getUserMessages = asyncHandler(async (req, res) => {
  const userReciever = await UserModel.findById(req.params.id);
  if (!userReciever) {
    return res.status(400).json(new AppFail("user not found!!"));
  }

  const messages = await MessageModel.find({
    $or: [
      { sender: req.user._id, receiver: userReciever._id },
      { sender: userReciever._id, receiver: req.user._id },
    ],
  }).sort("createdAt");
  res.json(new AppSuccess(messages));
});
