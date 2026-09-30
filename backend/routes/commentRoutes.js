import { Router } from "express";

import { deleteComment } from "../controller/commentController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const commentRouter = Router();

commentRouter.delete("/:commentId",authenticateToken,deleteComment);

export default commentRouter;