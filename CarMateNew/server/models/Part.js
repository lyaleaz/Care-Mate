import { Schema, model } from "mongoose";

const categories = [
  "brake system",
  "filters",
  "engine",
  "body",
  "suspension",
  "windscreen cleaning system",
  "steering",
  "clutch",
  "electric system",
  "doors",
  "tyres",
];

const partSchema = new Schema(
  {
    name: { type: String, lowercase: true, required: true },
    cost: { type: Number, required: true },
    currency: { type: String, lowercase: true, required: true },
    image: { type: String, lowercase: true, required: true },
    categorey: {
      type: String,
      lowercase: true,
      required: true,
      enum: categories,
    },
    cars: [{ type: Schema.Types.ObjectId, ref: "Car" }],
  },
  { timestamps: true }
);

export default model("Part", partSchema);
