const express = require("express");
const projectController = require("../controller/project");
const router = express.Router();

router.post("/status/create", projectController.statusCreate);
router.post("/type/create", projectController.typeCreate);
router.post("/question/create", projectController.questionCreate);

module.exports = router;
