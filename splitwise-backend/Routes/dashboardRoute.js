const express = require("express");
const router = express.Router();

const dashboardController = require("../Controllers/dashboardController");
const authMiddleware = require("../Middleware/authMiddleware");

router.get("/dashboard", authMiddleware, dashboardController.getDashboard);

module.exports = router;
