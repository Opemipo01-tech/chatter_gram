import Router from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getCurrentUser,getAllUsers,getUserById } from "../controller/userController.js";

const userRoute = Router();

userRoute.get("/me",authenticateToken,getCurrentUser);
userRoute.get("/",authenticateToken,getAllUsers)
userRoute.get("/:id",authenticateToken,getUserById)

export default userRoute;
