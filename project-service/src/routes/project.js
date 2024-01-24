const express = require("express");
const projectController = require("../controller/project");
const router = express.Router();

router.post("/status/create", projectController.statusCreate);
router.get("/status/get/all", projectController.allStatus);
router.post("/stage/create", projectController.stageCreate);
router.get("/stage/get/all", projectController.allStage);
router.post("/type/create", projectController.typeCreate);
router.get("/type/get/all", projectController.allType);
router.post("/question/create", projectController.questionCreate);
router.get("/question/get/all", projectController.allquestions);
router.get("/question/get/one/:queId", projectController.oneQuestion);
router.post("/answer/create/:questionId", projectController.answerCreate);
router.get("/answer/get/all", projectController.allAnswer);
router.get("/answer/get/one/:ansId", projectController.oneAnswer);

router.post("/project/create", projectController.projectCreate);
router.get("/project/get/all", projectController.allProject);
router.get("/project/get/one/:projectId", projectController.oneProject);
module.exports = router;
