import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { hash, compare } from "bcrypt";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    return res.status(500).json({ message: "Error", cause: error });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = await req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    // if (!password) {
    //   throw new Error("Password is required for hashing");
    // }
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return res
      .status(201)
      .json({ message: "User created successfully", id: user._id.toString() });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // user login request
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "User login successful" });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "there was an error" });
  }
};
