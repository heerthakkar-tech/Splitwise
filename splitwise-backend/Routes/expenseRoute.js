const express = require("express");
const router = express.Router();

const expenseController = require("../Controllers/expenseController");
const authMiddleware = require("../Middleware/authMiddleware");
const validate = require("../Middleware/validationMiddleware");
const { expenseSchema } = require("../validators/validator");

router.post(
  "/expenses",
  authMiddleware,
  validate(expenseSchema),
  expenseController.createExpense,
);

module.exports = router;
