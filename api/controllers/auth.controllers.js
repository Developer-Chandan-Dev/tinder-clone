import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import matchPassword from '../models/user.model.js'

const signToken = (id) => {
  // jwt token
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

export const signup = async (req, res) => {
  const { name, email, password, age, gender, genderPreference } = req.body;

  try {
    if (!name || !email || !password || !age || !gender || !genderPreference) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (age < 18) {
      return res.status(400).json({
        success: false,
        message: "Age must be at least 18 year",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      age,
      gender,
      genderPreference,
    });

    const token = signToken(newUser._id);

    res.cookie("tinder_clone_jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
      httpOnly: true, // prevent XSS attacks
      sameSite: "strict", // prevent CRFS attacks
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = signToken(user._id);

    res.cookie("tinder_clone_jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
      httpOnly: true, // prevent XSS attacks
      sameSite: "strict", // prevent CRFS attacks
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const logout = (req, res) => {
  res.clearCookie("tinder_clone_jwt");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// export const me = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const user = await User.findById(userId).select("-password");
//     if (!user) {
//       return res.status({ success: false, message: "User not found" });
//     }
//     console.log(user);

//     res.status(200).json({ success: true, user });
//     console.log(user);
//   } catch (error) {
//     console.log("Error in signup controller", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };
