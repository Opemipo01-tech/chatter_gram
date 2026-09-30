import express from "express";
import cors from "cors"
import authRouter from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import followRouter from "./routes/followRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";

const app = express();

app.use(express.json());

app.use(cors({
    origin: [
      "http://localhost:5173",
    ],
  }))

app.use("/api/auth",authRouter);
app.use("/api/users",userRoute);
app.use("/api/follows",followRouter);
app.use("/api/posts",postRouter);
app.use("/api/comments",commentRouter);


const PORT = 3000;

app.listen(PORT,()=> {
    console.log("Server running on port 3000")
})