/* eslint-disable @typescript-eslint/no-explicit-any */
import JWT from "jsonwebtoken";
import { RequestHandler } from "express";
import env from "../util/validateEnv";


export const requireSignIn: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const decode = JWT.verify(token, env.SECRET) as {
      [key: string]: any;
    };
    (req as any).user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
