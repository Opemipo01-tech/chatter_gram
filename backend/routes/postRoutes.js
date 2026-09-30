import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";

import { createPost,getPosts,getPostById } from "../controller/postController.js";
import { createComment } from "../controller/commentController.js";

const postRouter = Router();

postRouter.post("/",authenticateToken,createPost);
postRouter.get("/",authenticateToken,getPosts);
postRouter.post("/:postId/comments",authenticateToken,createComment);
postRouter.get("/:id",authenticateToken,getPostById);

export default postRouter;