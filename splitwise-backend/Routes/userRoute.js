const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const authMiddleware = require("../Middleware/authMiddleware");

router.get("/users", authMiddleware, userController.getUsers);

module.exports = router;
