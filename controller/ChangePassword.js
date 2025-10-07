import UserModel from "../Models/User.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const ChangePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    // 🧩 1. Validate input
    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Missing required fields",
      });
    }

    // 🧩 2. Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid user ID",
      });
    }

    // 🧩 3. Find user properly
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found",
      });
    }

    // 🧩 4. Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Old password is incorrect",
      });
    }

    // 🧩 5. Hash new password & update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const data = await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });

    res.status(200).json({
      data,
      success: true,
      error: false,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error: true,
    });
  }
};

export default ChangePassword;
