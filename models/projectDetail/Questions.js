const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      "Single Select",
      "Multi Select",
      "Small Text Input",
      "Large Text Input",
      "Radio Button",
    ],
  },
  options: [
    {
      type: string,
    },
  ],
  direct: {
    type: Boolean,
    required: true,
  },
  depQue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  depAns: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AnswerInAnswer",
    },
  ],
});

const QuestionModel = mongoose.model("Question", QuestionSchema);

module.exports = QuestionModel;
