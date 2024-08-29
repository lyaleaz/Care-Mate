import { Schema, model } from "mongoose";

const userCar = {
  car: { type: Schema.Types.ObjectId, ref: "Car" },
  LPN: { type: String, required: true },
};

const address = {
  city: { type: String, lowercase: true, required: true },
  street: { type: String, lowercase: true, required: true },
};

const userSchema = new Schema(
  {
    name: {
      first: { type: String, lowercase: true, required: true },
      last: { type: String, lowercase: true, required: true },
    },
    password: { type: String, required: true },
    email: { type: String, lowercase: true, required: true, unique: true },
    mobile: { type: String, required: true },
    role: { type: String, lowercase: true, required: true, default: "user" },
    address: address,
    car: { type: userCar, default: { car: null, LPN: "00000000" } },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

export default model("User", userSchema);
