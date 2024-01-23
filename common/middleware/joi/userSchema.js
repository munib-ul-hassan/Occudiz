const Joi = require("joi");

const userJoi = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name has to be at least 3 characters long",
    "string.max": "Name cannot be longer than 30 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().required().email().messages({
    "string.base": "Email should be a string",
    "string.empty": "Email cannot be empty",
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(7).max(40).required().messages({
    "string.base": "Password should be a string",
    "string.empty": "Password cannot be empty",
    "string.min": "Password has to be at least 7 characters long",
    "string.max": "Password cannot be longer than 40 characters",
    "any.required": "Password is required",
  }),
  phoneNumber: Joi.number()
    .integer()
    .min(1e9) // Minimum value is 10^9
    .max(1e10 - 1) // Maximum value is 10^10 - 1
    .required()
    .messages({
      "number.base": "Phone number should be a number",
      "number.empty": "Phone number cannot be empty",
      "number.integer": "Phone number should be an integer",
      "number.min": "Phone number should have at least 10 digits",
      "number.max": "Phone number should have at most 10 digits",
      "any.required": "Phone number is required",
    }),
  type: Joi.string()
    .required()
    .valid("Project-Owner", "FreeLancer", "Business"),

  idCard: Joi.when("type", {
    is: [Joi.valid("FreeLancer"), Joi.valid("Business")],
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),

  businessRegisterNum: Joi.when("type", {
    is: Joi.valid("Business"),
    then: Joi.string().required(),
    otherwise: Joi.allow(null),
  }),

  fcm_token: Joi.string(),
});

module.exports = userJoi;
