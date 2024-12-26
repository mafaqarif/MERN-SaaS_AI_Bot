import { Router } from "express";
import { verifyToken } from "../utils/token-manager";
import { chatCompletionVaidator, validate } from "../utils/validator";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controller";

const chatRouter = Router();
// protected routes

chatRouter.post(
  "/new",
  validate(chatCompletionVaidator),
  verifyToken,
  generateChatCompletion
);

chatRouter.get("/all-chats", verifyToken, sendChatsToUser);
chatRouter.delete("/delete", verifyToken, deleteChats);

export default chatRouter;
