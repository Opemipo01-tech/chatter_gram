import Router from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getCurrentUser,getAllUsers } from "../controller/userController.js";

const userRoute = Router();

userRoute.get("/me",authenticateToken,getCurrentUser);
userRoute.get("/",authenticateToken,getAllUsers)

export default userRoute;
