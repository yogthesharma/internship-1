import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: String,
    loginId: String,
    hash: String,
    sales: Array,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
