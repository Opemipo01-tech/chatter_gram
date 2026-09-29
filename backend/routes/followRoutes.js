import { Router } from "express";
import { followUser } from "../controller/followController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const followRouter = Router()

followRouter.post("/:userId",authenticateToken,followUser);

export default followRouter;