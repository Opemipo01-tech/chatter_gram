import { Router } from "express";
import { registerUser,loginUser } from "../controller/authController.js";
import { registerValidation,loginValidation } from "../validators/authValidator.js";

const authRouter = Router();

authRouter.post("/register",registerValidation,registerUser);
authRouter.post("/login",loginValidation,loginUser);

export default authRouter;