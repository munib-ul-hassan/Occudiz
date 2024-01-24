const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
    },
    launchDate: {
      type: Date,
    },
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Type",
      },
    ],
    porposalFrom: {
      type: String,
      enum: ["Verify Suppliers", "All Suppliers"],
    },
    myMeeting: {
      type: Date,
    },
    status: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
      },
    ],
    stage: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stage",
      },
    ],
    answerId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;
