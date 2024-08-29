import { Schema, model } from "mongoose";

const carSchema = new Schema(
  {
    make: { type: String, lowercase: true, required: true },
    model: { type: String, required: true },
    engine: { type: String, lowercase: true },
    year: { type: Number, required: true },
    image: { type: String, lowercase: true },
  },
  { timestamps: true }
);

export default model("Car", carSchema);
