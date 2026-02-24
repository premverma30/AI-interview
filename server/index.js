// ================= IMPORT PACKAGES =================

import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/connectDb.js";
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");

// ================= CONFIG =================
dotenv.config(); // Load .env file

const app = express();


// ================= MIDDLEWARE =================
// app.use(express.json()); // To read JSON data
// app.use(cors()); // Allow frontend connection
// app.use(cookieParser()); // To read cookies


// ================= SERVER =================
const PORT = process.env.PORT || 5000; 


// ================= ROUTES =================
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    connectDB()
});