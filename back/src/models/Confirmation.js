import mongoose from "mongoose";

const confirmationSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId },
  },
  { timestamps: true }
);
const ConfirmationModel = mongoose.model("message", confirmationSchema);
export default ConfirmationModel;
