import express from "express";
import {
  getAuthenticatedUser,
  loginController,
  logoutController,
  registerController,
} from "../controller/authController";

const router = express.Router();

router.get("/", getAuthenticatedUser);
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout",logoutController)

export default router;
