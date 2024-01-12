const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
});

const TypeModel = mongoose.model("Type", TypeSchema);

module.exports = TypeModel;
