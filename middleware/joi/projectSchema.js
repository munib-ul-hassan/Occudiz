const Joi = require("joi");

const projectJoi = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name has to be at least 3 characters long",
    "string.max": "Name cannot be longer than 30 characters",
    "any.required": "Name is required",
  }),
  detial: Joi.string(),
  launchDate: Joi.date(),
  type: Joi.string().valid(
    "E-Commerce",
    "FinTecj",
    "Market Place",
    "Other Technology",
    "Other"
  ),
  porposalFrom: Joi.string().valid("Verify Suppliers", "All Suppliers"),
  myMeeting: Joi.date(),
});

module.exports = projectJoi;
