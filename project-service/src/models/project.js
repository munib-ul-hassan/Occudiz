const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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
    porposalFrom: {
      type: String,
      enum: ["Verify Suppliers", "All Suppliers"],
    },
    myMeeting: [
      {
        type: String,
      },
    ],
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
    color: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;
