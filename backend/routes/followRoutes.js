import { Router } from "express";
import { followUser,getFollowRequests } from "../controller/followController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const followRouter = Router()

followRouter.get("/follow-requests",authenticateToken,getFollowRequests);
followRouter.post("/:userId",authenticateToken,followUser);

export default followRouter;