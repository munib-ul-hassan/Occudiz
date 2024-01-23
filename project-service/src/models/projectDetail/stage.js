const mongoose = require("mongoose");

const StageSchema = new mongoose.Schema({
  stage: {
    type: String,
    required: true,
  },
});

const StageModel = mongoose.model("Stage", StageSchema);

module.exports = StageModel;
