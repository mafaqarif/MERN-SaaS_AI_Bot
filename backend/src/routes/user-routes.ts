import { Router } from "express";
import { getAllUsers, userSignup } from "../controllers/user-controller";
import { signupValidator, validate } from "../utils/validator";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signupValidator), userSignup);

export default userRouter;
