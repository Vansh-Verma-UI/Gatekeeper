
const express = require("express");
const router = express.Router();

const User = require("../configure/Models/user.js");

const {
    protect,
    authorizeRoles
} = require("../Middleware/authMiddleware.js");

// Protected Profile Route
router.get("/me", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Protected profile accessed successfully!",
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to fetch profile."
        });
    }
});

// Admin Only Route
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Admin Dashboard!"
    });
});

module.exports = router;
