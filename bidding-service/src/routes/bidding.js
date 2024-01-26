const express = require("express");
const biddingController = require("../controller/bidding.js");
const {
  ProjectCreateSchema,
  updateProjectSchema,
  questionCreateSchema,
  questionUpdateSchema,
} = require("../../../common/schemas/project");
const {
  requireSchema,
  requireValidId,
} = require("../../../common/middleware/validate");
const router = express.Router();

module.exports = router;
