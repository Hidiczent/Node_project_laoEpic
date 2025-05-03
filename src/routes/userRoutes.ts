import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  verifyOtpUser,
  registerWithOtp,
  verifyRegisterOtp,
  resendOtp,
  updateProfile,
  requestResetPassword,
  confirmResetPassword,
  changePassword,
} from "../controllers/userController";
import { isAdmin } from "../middlewares/isAdmin";
import { authenticateToken } from "../middlewares/authMiddleware";
import { isUser } from "../middlewares/isUser";

const router = Router();

// Get all users
router.get("/gets/admin-only", authenticateToken, isAdmin, getUsers);
router.get("/gets/user", getUsers);

// Get a user by ID
router.get("/get/admin-only/:id", authenticateToken, isAdmin, getUserById);

// Update a user by ID
router.put("/update/:id", updateUser);

// router.post("/verify", verifyOtpUser); // ✅ เพิ่ม endpoint นี้
router.put("/profile", authenticateToken, updateProfile);

// Delete a user by ID
router.delete("/delete/admin-only/:id", authenticateToken, isAdmin, deleteUser);
// User login
router.post("/login", loginUser);
// Create a new user
router.post("/register", registerWithOtp); // ✅ ส่ง OTP + เก็บ metadata
router.post("/verify", verifyRegisterOtp);
router.post("/resend-otp", resendOtp);
router.post("/reset-password/request", requestResetPassword);
router.post("/reset-password/confirm", confirmResetPassword);

router.put("/:id/password", changePassword);

export default router;
