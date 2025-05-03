import { Request, Response } from "express";
import User from "../interface/userModel";
import OTP from "../interface/otp.model";
import { sendOTPEmail } from "../utils/sendEmail";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { OTPService } from "../services/otp.service";
import OTPMetadata from "../interface/otpMetadata.model";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_jwt_secret_key";

// Create a new user + ส่ง OTP
export const registerWithOtp = async (req: Request, res: Response) => {
  const { email, action, metadata } = req.body;

  if (
    !email ||
    !action ||
    !metadata ||
    !metadata.first_name ||
    !metadata.password
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 นาที

    await OTP.destroy({ where: { email, action } });
    await OTP.create({ email, code: otp, action, expires_at: expiresAt });

    await OTPMetadata.destroy({ where: { email, action } });
    for (const [key, value] of Object.entries(metadata)) {
      await OTPMetadata.create({
        email,
        action,
        field_key: key,
        field_value: value,
      });
    }

    await sendOTPEmail(email, otp);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("❌ Error during register:", err);
    res.status(500).json({ error: "Internal server error", details: err });
  }
};

export const verifyOtpUser = async (req: Request, res: Response) => {
  const { email, otp: code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: "Missing email or OTP" });
  }

  const found = await OTP.findOne({
    where: {
      email,
      code, // ✅ ใช้ code แทน otp
      action: "register",
      expires_at: { [Op.gt]: new Date() },
      verified: false,
    },
  });

  if (!found) {
    return res.status(401).json({ error: "Invalid or expired OTP" });
  }

  await User.update({ is_verified: true }, { where: { email } });
  await OTP.destroy({ where: { email, action: "register" } });

  res.json({ message: "✅ Email verified successfully" });
};

// ✅ แบบสร้าง user จาก OTP metadata
export const verifyRegisterOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Missing email or OTP" });
  }

  try {
    const otpService = new OTPService();
    const metadata = await otpService.verifyOtpAndGetMetadata(
      email,
      otp,
      "register"
    );

    // 🔐 เข้ารหัส password ก่อนบันทึก
    const hashedPassword = await bcryptjs.hash(metadata.password, 10);

    // ✅ สร้าง user ใหม่
    const newUser = await User.create({
      first_name: metadata.first_name,
      lastname: metadata.lastname || "Default",
      phone_number: metadata.phone_number || "0000000000",
      email,
      password: hashedPassword,
      is_verified: true,
      role: metadata.role || "user",
    });

    res.status(201).json({
      message: "✅ Email verified and user registered successfully",
      user_id: newUser.user_id,
    });
  } catch (error) {
    console.error("❌ OTP verification failed:", error);
    res.status(401).json({ error: "Invalid or expired OTP" });
  }
};

export const resendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.is_verified) {
      return res.status(400).json({ error: "This email is already verified" });
    }

    const otpService = new OTPService();
    await otpService.sendOtpWithMetadata(email, "register", {});

    return res.status(200).json({ message: "✅ OTP resent successfully" });
  } catch (error) {
    console.error("❌ Error resending OTP:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Login user (เช็ก is_verified)
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.is_verified) {
      return res
        .status(403)
        .json({ message: "Please verify your email before login." });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login", details: error });
  }
};

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users", details: error });
  }
};
export const changePassword = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { old_password, new_password, confirm_password } = req.body;

  if (!old_password || !new_password || !confirm_password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (new_password !== confirm_password) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const passwordMatch = await bcryptjs.compare(old_password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Old password is incorrect" });
    }

    const hashedPassword = await bcryptjs.hash(new_password, 10);
    await user.update({ password: hashedPassword });

    res.status(200).json({ message: "✅ Password updated successfully" });
  } catch (err) {
    console.error("❌ Error updating password:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user", details: error });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { first_name, lastname, password, phone_number, email, photo, role } =
    req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcryptjs.hash(password, 10);
    }

    await user.update({
      first_name,
      lastname,
      password: hashedPassword,
      phone_number,
      email,
      photo,
      role,
    });

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user", details: error });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const userId = req.user?.user_id;
  const { first_name, phone_number, lastname } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.update({ first_name, lastname, phone_number });

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile", details: err });
  }
};

export const requestResetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ error: "User not found" });

  const otpService = new OTPService();
  await otpService.sendOtpWithMetadata(email, "reset_password", {});

  res.json({ message: "OTP sent to email for password reset" });
};

export const confirmResetPassword = async (req: Request, res: Response) => {
  const { email, otp, new_password } = req.body;

  if (!email || !otp || !new_password)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const otpService = new OTPService();
    await otpService.verifyOtpAndGetMetadata(email, otp, "reset_password");

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const hashed = await bcryptjs.hash(new_password, 10);
    await user.update({ password: hashed });

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(401).json({ error: "OTP verification failed", details: err });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user", details: error });
  }
};
