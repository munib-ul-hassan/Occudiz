const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  answers: [
    {
      asnwer: {
        type: String,
        required: true,
      },
    },
  ],
});

const AnswerModel = mongoose.model("Answer", AnswerSchema);

module.exports = AnswerModel;
