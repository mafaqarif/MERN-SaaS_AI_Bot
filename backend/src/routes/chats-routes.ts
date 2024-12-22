import { Router } from "express";
import { verifyToken } from "../utils/token-manager";
import { chatCompletionVaidator, validate } from "../utils/validator";
import { generateChatCompletion } from "../controllers/chat-controller";

const chatRouter = Router();
// protected routes

chatRouter.post(
  "/new",
  validate(chatCompletionVaidator),
  verifyToken,
  generateChatCompletion
);

export default chatRouter;
