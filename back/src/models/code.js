import mongoose from "mongoose";

const Codeschema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId },

  },
  { timestamps: true }
);
const Codemodel = mongoose.model("Code", Codeschema);
export default Codemodel;
