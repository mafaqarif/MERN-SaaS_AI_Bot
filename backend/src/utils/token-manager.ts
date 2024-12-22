import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants";

export const createToken = (id: string, email: string, expiresIn: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get token from cookie
  const token = req.signedCookies[`${COOKIE_NAME}`];

  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token not found" });
  }

  // verify token and attach user data to the request object
  return new Promise<void>((resolve, reject) => {
    // check if JWT_SECRET is defined in environment variables
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    // jwt verification
    return jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err: any, success: any) => {
        if (err) {
          reject(err.message);
          return res.status(401).json({ message: "Token expired" });
        } else {
          resolve();
          res.locals.jwtData = success;
          return next();
        }
      }
    );
  });
};
