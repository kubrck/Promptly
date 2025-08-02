import { Router } from "express";
import {
  register,
  login,
  logout,
  getProfile,
} from "../controllers/userController";
import { validateRegistration, validateLogin } from "../middleware/validators";
import { authenticateUser } from "../middleware/auth";

const router = Router();

// Public routes
router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);

// Protected routes
router.get("/profile", authenticateUser, getProfile);

export default router;
