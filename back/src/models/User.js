import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, requried: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});
const UserModel = mongoose.model("user", userSchema);
export default UserModel;
