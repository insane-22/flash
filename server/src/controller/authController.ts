import { RequestHandler } from "express";
import UserModel from "../models/userSchema";
import env from "../util/validateEnv";
import { comparePassword, hashPassword } from "./../helpers/authHelper";
import JWT from "jsonwebtoken";

export const getAuthenticatedUser: RequestHandler = async (req, res) => {
  const authenticatedId = req.session.userId;
  try {
    if (!authenticatedId) {
      return res.status(401).send({
        success: false,
        message: "Unauthenticated User",
      });
    }
    const user = await UserModel.findById(authenticatedId)
      .select("+email")
      .exec();

    return res.status(201).send({
      success: true,
      message: "Authentication successful!",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in authentication",
      error,
    });
  }
};

interface RegisterBody {
  username?: string;
  email?: string;
  password?: string;
}

export const registerController: RequestHandler<
  unknown,
  unknown,
  RegisterBody,
  unknown
> = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username) {
      return res.status(500).send({ error: "Name is required" });
    }
    if (!email) {
      return res.status(500).send({ error: "email is required" });
    }
    if (!password) {
      return res.status(500).send({ error: "Password is required" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered! Login to continue",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new UserModel({
      username,
      password: hashedPassword,
      email,
    }).save();

    const token = JWT.sign({ _id: user._id }, env.SECRET, {
      expiresIn: "1d",
    });

    res.status(200).send({
      success: true,
      message: "All Notes",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in registering",
      error,
    });
  }
};

interface LoginBody {
  email?: string;
  password?: string;
}

export const loginController: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or Password",
      });
    }

    const user = await UserModel.findOne({ email })
      .select("+password +username")
      .exec();
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered, Register to Continue",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = JWT.sign({ _id: user._id }, env.SECRET, {
      expiresIn: "1d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successful",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error",
      error,
    });
  }
};