
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./configure/db");
const authRoutes = require("./Routes/authRoutes");
const protectedRoutes = require("./Routes/protectedroutes");

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

app.get("/", (req, res) => {
    res.send("Gatekeeper Backend Running Successfully!");
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "success",
        message: "Gatekeeper API is working!"
    });
});

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
