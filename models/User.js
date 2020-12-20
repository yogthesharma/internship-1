import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    loginId: { type: String, unique: true },
    hash: String,
    sales: Array,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
