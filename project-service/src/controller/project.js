const ProjectModel = require("../models/project");
const StatusModel = require("../models/projectDetail/status");
const TypeModel = require("../models/projectDetail/type");
const AnswerModel = require("../models/projectDetail/answer");
const QuestionModel = require("../models/projectDetail/Questions");
const questionJoi = require("../../../common/middleware/joi/questionSchema");
const StageModel = require("../models/projectDetail/stage");
const projectJoi = require("../../../common/middleware/joi/projectSchema");
// const projectJoi = require("../../../common/middleware/joi/projectSchemas");

module.exports.statusCreate = async (req, res) => {
  try {
    const status = req.body.status;
    if (!status) {
      return res.status(400).send({
        success: false,
        message: "You have to provide a Status field",
      });
    }
    const statuss = status.toLowerCase();
    console.log(statuss);
    const existingStatus = await StatusModel.findOne({ status: statuss });
    if (existingStatus) {
      return res
        .status(400)
        .send({ success: false, message: "This status is alredy added" });
    }
    const newStatus = new StatusModel({
      status: statuss,
    });
    await newStatus.save();
    res.status(200).send({
      success: true,
      message: "New status has been added",
      data: newStatus,
    });
  } catch (error) {
    cosnole.log(error);
    res.status(500).send({ success: false, message: "Internal server error " });
  }
};

module.exports.stageCreate = async (req, res) => {
  try {
    const stage = req.body.stage;
    if (!stage) {
      return res.status(400).send({
        success: false,
        message: "You have to provide a Status field",
      });
    }
    const stages = stage.toLowerCase();
    console.log(stages);
    const existingStatus = await StatusModel.findOne({ stage: stages });
    if (existingStatus) {
      return res
        .status(400)
        .send({ success: false, message: "This status is alredy added" });
    }
    const newStage = new StageModel({
      stage: stages,
    });
    await newStage.save();
    res.status(200).send({
      success: true,
      message: "New status has been added",
      data: newStage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error " });
  }
};

module.exports.typeCreate = async (req, res) => {
  try {
    const type = req.body.type;
    if (!type) {
      return res.status(400).send({
        success: false,
        message: "You have to provide a Status field",
      });
    }
    const types = type.toLowerCase();
    console.log(types);
    const existingStatus = await TypeModel.findOne({ type: types });
    if (existingStatus) {
      return res
        .status(400)
        .send({ success: false, message: "This type is alredy added" });
    }
    const newStatus = new TypeModel({
      type: types,
    });
    await newStatus.save();
    res.status(200).send({
      success: true,
      message: "New type has been added",
      data: newStatus,
    });
  } catch (error) {
    cosnole.log(error);
    res.status(500).send({ success: false, message: "Internal server error " });
  }
};

module.exports.questionCreate = async (req, res) => {
  try {
    const result = questionJoi.validate(req.body, {
      abortEarly: false,
    });
    // console.log(result);
    if (result.error) {
      const x = result.error.details.map((error) => error.message);
      return res.status(400).json({
        success: false,
        message: x,
      });
    }

    const newQuestion = new QuestionModel({ ...result.value });
    await newQuestion.save();
    console.log(newQuestion);
    res.status(200).send({
      sucess: true,
      message: "question has been added",
      data: newQuestion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error " });
  }
};

module.exports.answerCreate = async (req, res) => {
  try {
    const answers = req.body.answers;
    const questionId = req.params.questionId;
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      return res
        .status(400)
        .send({ success: false, messaeg: "No Question Found on that id" });
    }
    if (!answers) {
      return res
        .status(400)
        .send({ success: false, messaeg: "You have to provide the answer" });
    }
    const newAnswer = new AnswerModel({
      answers,
      questionId,
    });

    await newAnswer.save();

    res.status(200).send({
      success: true,
      messaeg: "Answer submitted successfully",
      data: newAnswer,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

module.exports.projectCreate = async (req, res) => {
  try {
    const result = projectJoi.validate(req.body, {
      abortEarly: false,
    });
    console.log(result);
    if (result.error) {
      const x = result.error.details.map((error) => error.message);
      return res.status(400).json({
        success: false,
        message: x,
      });
    }

    const newProject = new ProjectModel({ ...result.value });
    await newProject.save();
    console.log(newProject);
    res.status(200).send({
      sucess: true,
      message: "Project has been added",
      data: newProject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error " });
  }
};
