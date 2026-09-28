import Router from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getCurrentUser } from "../controller/userController.js";

const userRoute = Router();

userRoute.get("/me",authenticateToken,getCurrentUser);

export default userRoute;
