const Joi = require("joi");

const nameValidation = Joi.string().trim().min(2).max(50).required().messages({
  "string.empty": "Name is required",
  "string.min": "Name must be at least 2 characters",
  "any.required": "Name is required",
});

const emailValidation = Joi.string()
  .email()
  .lowercase()
  .trim()
  .required()
  .messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  });

const passwordValidation = Joi.string()
  .min(6)
  .max(30)
  .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
  .required()
  .messages({
    "string.min": "Password must be at least 6 characters",
    "string.pattern.base": "Password must contain only letters and numbers.",
  });

const descriptionValidation = Joi.string()
  .trim()
  .required()
  .messages({ "any.required": "description is a required field" });

const amountValidation = Joi.number() // Use number() instead of string()
  .greater(0)
  .required()
  .messages({
    "number.base": "Amount must be a number", // Added for non numeric input
    "number.greater": "Amount must be more than 0",
  });

const membersValidation = Joi.alternatives().conditional("split_type", {
  is: "equal",
  then: Joi.array().items(Joi.number()).required(),

  otherwise: Joi.array()
    .items(
      Joi.object({
        user_id: Joi.number().required(),
        percentage: Joi.number().required(),
      }),
    )
    .required()
    .messages({
      "array.min": "There must be at least Two members to split an expense",
    }),
});

const split_typeValidation = Joi.string()
  .valid("equal", "percentage")
  .required();

//const paid_byValidation = Joi.number().required();

const signupSchema = Joi.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
});

const loginSchema = Joi.object({
  email: emailValidation,
  password: passwordValidation,
});

const expenseSchema = Joi.object({
  description: descriptionValidation,
  amount: amountValidation,
  members: membersValidation,
  split_type: split_typeValidation,
  //paid_by: paid_byValidation,
});

module.exports = {
  signupSchema,
  loginSchema,
  expenseSchema,
};
