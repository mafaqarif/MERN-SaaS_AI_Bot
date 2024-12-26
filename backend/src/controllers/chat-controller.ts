import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { configureOpenAi } from "../config/openai-config";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registerd or token expired" });

    // grab chats of user

    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];

    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    // send all chat messages with new message to api

    const config = configureOpenAi();
    const openai = new OpenAIApi(config);
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    // get response
    if (!chatResponse.data.choices[0].message) {
      throw new Error("invalid response frm openai: " + chatResponse.data);
    }
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    return res.status(500).json({ message: "Error", cause: error });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // user login request
  try {
    const existingUser = await User.findById(res.locals.jwtData.id);
    if (!existingUser) {
      return res.status(401).send("User not Registered Or Token expired");
    }
    if (existingUser._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.status(200).json({
      message: "User login successful",
      chats: existingUser.chats,
    });
  } catch (error) {
    console.log("there was an error : " + error);
    res.status(200).json({ message: "there was an error" });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // user login request
  try {
    const existingUser = await User.findById(res.locals.jwtData.id);
    if (!existingUser) {
      return res.status(401).send("User not Registered Or Token expired");
    }
    if (existingUser._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    existingUser.chats = [];
    await existingUser.save();

    res.status(200).json({
      message: "User login successful",
    });
  } catch (error) {
    console.log("there was an error : " + error);
    res.status(200).json({ message: "there was an error" });
  }
};
