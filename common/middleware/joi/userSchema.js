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
  phoneNumber: Joi.string(),
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
