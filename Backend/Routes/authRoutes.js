
const express = require("express");

const router = express.Router();

// Import Authentication Controller
const {
    registerUser,
    loginUser
} = require("../controllers/authcontroller.js");

// Register API
router.post("/register", registerUser);

// Login API
router.post("/login", loginUser);

// Export Router
module.exports = router;
