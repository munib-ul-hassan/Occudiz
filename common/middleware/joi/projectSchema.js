const Joi = require("joi");
const StageModel = require("../../../project-service/src/models/projectDetail/stage");
const StatusModel = require("../../../project-service/src/models/projectDetail/status");

const validatestatus = async (idValue, helpers) => {
  const allStatusIds = await StatusModel.getAllStatusIds();
  const isValid = allStatusIds.includes(idValue);
  if (!isValid) return helpers.message("Invalid Status");
  return idValue;
};
const validatestage = async (idValue, helpers) => {
  const allStageIds = await StageModel.getAllStageIds();
  const isValid = allStageIds.includes(idValue);
  if (!isValid) return helpers.message("Invalid stage");
  return idValue;
};

const projectJoi = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name has to be at least 3 characters long",
    "string.max": "Name cannot be longer than 30 characters",
    "any.required": "Name is required",
  }),
  detial: Joi.string().min(20).required(),
  launchDate: Joi.date().required().messages({
    "string.base": `"launch Date" should be a type of Date`,
    "string.empty": `"launch Date" cannot be an empty field`,
    "any.required": `"launch Date" is a required field`,
  }),
  type: Joi.string()
    .pattern(/^[a-f\d]{24}$/i)
    .required(),
  porposalFrom: Joi.string()
    .valid("Verify Suppliers", "All Suppliers")
    .required()
    .messages({
      "string.base": `"Porposal From" should be a one of "Verify Suppliers", "All Suppliers"`,
      "string.empty": `"Porposal From" cannot be an empty field`,
      "any.required": `"Porposal From" is a required field`,
    }),
  answerId: Joi.array().required(),
  myMeeting: Joi.date(),
  status: Joi.string()
    .pattern(/^[a-f\d]{24}$/i)
    .required(),
  // .external(validatestatus),
  stage: Joi.string()
    .pattern(/^[a-f\d]{24}$/i)
    .required(),
  // .external(validatestage),
});

module.exports = projectJoi;
