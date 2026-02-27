import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js"
// ================= CONFIG =================
dotenv.config(); // Load .env file

const app = express();


// ================= MIDDLEWARE =================
app.use(express.json()); // To read JSON data
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
})); // Allow frontend connection
app.use(cookieParser()); // To read cookies

app.use("/api/auth" , authRouter)
app.use("/api/user", userRouter)


// ================= SERVER =================
const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    connectDB()
});