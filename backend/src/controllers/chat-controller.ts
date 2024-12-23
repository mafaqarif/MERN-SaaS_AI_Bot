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
