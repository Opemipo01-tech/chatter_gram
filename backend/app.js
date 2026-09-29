import express from "express";
import cors from "cors"
import authRouter from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import followRouter from "./routes/followRoutes.js";

const app = express();

app.use(express.json());

app.use(cors())

app.use("/api/auth",authRouter);
app.use("/api/users",userRoute);
app.use("/api/follows",followRouter);


const PORT = 3000;

app.listen(PORT,()=> {
    console.log("Server running on port 3000")
})