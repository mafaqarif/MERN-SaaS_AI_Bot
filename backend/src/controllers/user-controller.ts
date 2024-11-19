import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { hash } from "bcrypt";

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
    console.log("body " + req.body);
    const { name, email, password } = await req.body;
    console.log("here");
    console.log("name" + name);
    console.log("email" + email);
    console.log("password" + password);

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
