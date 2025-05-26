import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    sender: { type: mongoose.Types.ObjectId, required: true },
    receiver: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true }
);
const MessageModel = mongoose.model("message", messageSchema);
export default MessageModel;
