import { Router } from "express";
import userRouter from "./user-routes";
import chatRouter from "./chats-routes";

const appRouter = Router();

appRouter.use("/user", userRouter);
appRouter.use("/chat", chatRouter);

export default appRouter;
