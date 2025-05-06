import express from "express";
import Review from "../mongoDB/reviewsSchemma.js";
import User from "../mongoDB/usersSchemma.js";
import cloudinary  from '../cloudinary.js';
import multer from 'multer';
import streamifier from 'streamifier';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({}).populate('userId', 'firstName lastName image').sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//--------------------- POST a review
router.post("/post-review", upload.single("image"), async (req, res) => {
  try {
    const { userId, stars, text } = req.body;
    const rating = stars

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const existingReview = await Review.findOne({ userId });
    if (existingReview) return res.status(409).json({ message: "You have already submitted a review" });
    
    // ✅ Upload image to Cloudinary if provided
    let imageUrl = "";
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "user_reviews" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = uploadResult.secure_url;
    }

    // ✅ Create and save review
    const newReview = new Review({
      userId,
      rating,
      text,
      experienceImage: imageUrl,
    });

    await newReview.save();

    // ✅ Link review back to user
    user.review = newReview._id;
    await user.save();

    res.status(201).json({ message: "Review posted successfully", review: newReview });
  } catch (error) {
    console.error("Error posting review:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/delete-review/:id", async (req, res) => {
  const { id } = req.params; // Get the review ID from the request params
  try {
    const reviewToDelete = await Review.findById(id);
    if (!reviewToDelete) return res.status(404).json({ message: "Review not found" });
    
    await Review.findByIdAndDelete(id);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;