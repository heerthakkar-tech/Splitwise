const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const validate = require("../Middleware/validationMiddleware");
const authMiddleware = require("../Middleware/authMiddleware");
const { signupSchema, loginSchema } = require("../validators/validator");

router.post("/signup", validate(signupSchema), authController.signup);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authMiddleware, authController.logout);

module.exports = router;
