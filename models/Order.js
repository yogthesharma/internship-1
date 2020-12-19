import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    data: Date,
    item: String,
    qty: Number,
    totalPrice: Number,
  },
  { timestamp: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
