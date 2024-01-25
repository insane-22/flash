import express from "express";
import {
  getAuthenticatedUser,
  loginController,
  registerController,
} from "../controller/authController";

const router = express.Router();

router.get("/", getAuthenticatedUser);
router.post("/register", registerController);
router.post("/login", loginController);

export default router;
