import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";

import { createPost,getPosts,getPostById } from "../controller/postController.js";

const postRouter = Router();

postRouter.post("/",authenticateToken,createPost);
postRouter.get("/",authenticateToken,getPosts);
postRouter.get("/:id",authenticateToken,getPostById);

export default postRouter;