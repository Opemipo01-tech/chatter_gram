import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authenticateToken, async (req, res) => {
  res.json({
    message: "You are authenticated.",
    userId: req.user.id,
  });
});

export default router;