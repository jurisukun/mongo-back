const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: {
      type: String,
      required: [true, "Item name is required"],
    },
    price: {
      type: Number,
      required: [true, "Item price is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Item quantity is required"],
    },
  },
  { timestamps: true }
);

const itemModel = mongoose.model("Item", itemSchema);
module.exports = itemModel;
