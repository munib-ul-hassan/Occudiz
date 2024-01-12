const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
});

const StatusModel = mongoose.model("Status", StatusSchema);

module.exports = StatusModel;
