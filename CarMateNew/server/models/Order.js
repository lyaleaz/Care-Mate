import { Schema, model } from "mongoose";

const statuses = ["pending", "processing", "shipped", "delivered"];
const Status = {
  type: String,
  lowercase: true,
  default: "pending",
  required: true,
  enum: statuses,
};

const addressSchema = new Schema({
  city: { type: String, lowercase: true, required: true },
  street: { type: String, lowercase: true, required: true },
});

const partItemSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: "Part", required: true },
  amount: { type: Number, required: true },
  discount: { type: Number, required: true },
  status: Status,
});

const serviceItemSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  amount: { type: Number, required: true },
  discount: { type: Number, required: true },
  status: Status,
});

const orderSchema = new Schema(
  {
    carParts: [partItemSchema],
    carServices: [serviceItemSchema],
    user: { type: Schema.Types.ObjectId, ref: "User" },
    address: { type: addressSchema, required: true },
    date: { type: Date, default: Date.now, required: true },
    total: { type: Number, default: 0, required: true },
    status: Status,
  },
  { timestamps: true }
);

export default model("Order", orderSchema);
