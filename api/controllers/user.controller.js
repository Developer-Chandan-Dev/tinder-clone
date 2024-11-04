import fs from "fs";
import User from "../models/user.model.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/uploadToCloudinary.js";

export const updateProfile = async (req, res) => {
  try {
    const image = req.file ? req.file.path : null; // Local file path
    const { name, age, gender, genderPreference, bio } = req.body;

    // Check for required fields
    if (!name && !age && !gender && !genderPreference) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in required fields" });
    }

    // Find user
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Variables to hold the new image URL and public ID
    let imageUrl = user.image;
    let imagePublicId = user.imagePublicId;

    // Delete old image if new one is provided
    if (image && user.imagePublicId) {
      await deleteFromCloudinary(user.imagePublicId);
    }

    // Upload new image to Cloudinary, if provided
    if (image) {
      const uploadResult = await uploadToCloudinary(
        image,
        "tinder-clone-images",
        `tinder-clone-images/${name}_${Date.now()}`
      );
      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;

      // Delete local file after successful upload to Cloudinary
      fs.unlink(image, (err) => {
        if (err) console.error("Error removing file:", err);
      });
    }

    // Update user details in database
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        image: imageUrl,
        imagePublicId: imagePublicId,
        name,
        age,
        gender,
        genderPreference,
        bio,
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found, updating error" });
    }
    req.user = updatedUser;
    // Respond with updated user data
    res.status(200).json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        age: updatedUser.age,
        gender: updatedUser.gender,
        genderPreference: updatedUser.genderPreference,
        bio: updatedUser.bio,
        image: updatedUser.image,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
