// reviewsSchema.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }, // one review per user
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true, trim: true },
  experienceImage: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});


const Review = mongoose.model("Review", reviewSchema);

export default Review;

// not used yet