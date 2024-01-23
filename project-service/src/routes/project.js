const express = require("express");
const projectController = require("../controller/project");
const router = express.Router();

router.post("/status/create", projectController.statusCreate);
router.post("/stage/create", projectController.stageCreate);
router.post("/type/create", projectController.typeCreate);
router.post("/question/create", projectController.questionCreate);
router.post("/answer/create/:questionId", projectController.answerCreate);

router.post("/project/create", projectController.projectCreate);
module.exports = router;
