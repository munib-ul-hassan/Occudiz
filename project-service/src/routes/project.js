const express = require("express");
const projectController = require("../controller/project");
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

router.post("/status/create", projectController.statusCreate);
router.get("/status/get/all", projectController.allStatus);
router.delete("/status/delete/:statusId", projectController.deleteStatus);
router.post("/stage/create", projectController.stageCreate);
router.get("/stage/get/all", projectController.allStage);
router.delete("/stage/delete/:stageId", projectController.deleteStage);
router.post("/type/create", projectController.typeCreate);
router.get("/type/get/all", projectController.allType);
router.delete("/type/delete/:typeId", projectController.deleteType);
router.post("/question/create", projectController.questionCreate);
router.get("/question/get/all", projectController.allquestions);
router.delete("/question/delete/:questionId", projectController.deleteQuestion);
router.get("/question/get/one/:queId", projectController.oneQuestion);
router.post("/answer/create/:questionId", projectController.answerCreate);
router.get("/answer/get/all", projectController.allAnswer);
router.delete("/answer/delete/:answerId", projectController.deleteAnswer);
router.get("/answer/get/one/:ansId", projectController.oneAnswer);

router.post(
  "/project/create",
  requireSchema(ProjectCreateSchema),
  projectController.projectCreate
);
router.post(
  "/project/update/:projectId",
  requireSchema(updateProjectSchema),
  projectController.updateProject
);
router.get("/project/get/all", projectController.allProject);
router.get("/project/get/business", projectController.allBusinessProject);
router.get("/project/get/one/:projectId", projectController.oneProject);
router.delete("/project/delete/:projectId", projectController.deleteProject);

module.exports = router;
