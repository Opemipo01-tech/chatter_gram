import Router from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getCurrentUser,getAllUsers,getUserById,updateMyProfile,getFollowers,getFollowing } from "../controller/userController.js";

const userRoute = Router();

userRoute.get("/me",authenticateToken,getCurrentUser);
userRoute.patch("/me",authenticateToken,updateMyProfile);
userRoute.get("/",authenticateToken,getAllUsers)
userRoute.get("/:id/followers",authenticateToken,getFollowers);
userRoute.get("/:id/following",authenticateToken,getFollowing);
userRoute.get("/:id",authenticateToken,getUserById)

export default userRoute;
