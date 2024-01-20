const Joi = require("joi");

const questionJoi = Joi.object({
  question: Joi.string().required().min(5).max(100).messages({
    "string.base": "Question should be a string",
    "string.empty": "Question cannot be empty",
    "string.min": "Question has to be at least 5 characters long",
    "string.max": "Question cannot be longer than 100 characters",
    "any.required": "Question is required",
  }),
  type: Joi.string()
    .required()
    .valid(
      "Single Select",
      "Multi Select",
      "Small Text Input",
      "Large Text Input",
      "Radio Button"
    ),
  options: Joi.when("type", {
    is: Joi.string().valid("Single Select", "Multi Select", "Radio Button"),
    then: Joi.array().items(Joi.string()).min(1).required(),
    otherwise: Joi.forbidden(),
  }),
  direct: Joi.boolean().required(),
  depQue: Joi.when("direct", {
    is: false,
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  depAns: Joi.when("direct", {
    is: false,
    then: Joi.array().items(Joi.array()).min(1).required(),
    otherwise: Joi.forbidden(),
  }),
});

module.exports = questionJoi;
