import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    item: String,
    price: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);
