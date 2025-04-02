import mongoose, { models, Schema } from "mongoose";

const CarSchema: Schema = new Schema(
  {
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    color: { type: String, required: true, trim: true },
    mileage: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    engine: { type: String, required: true, trim: true },
    transmission: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    bodyType: { type: String, required: true, trim: true },
    fuelType: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Car = models.Car || mongoose.model("Car", CarSchema);

export default Car;
