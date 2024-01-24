const ProjectSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    detail: {
      type: "string",
    },
    launchDate: {
      type: "date",
    },
    type: [
      {
        type: "_id",
        ref: "Type",
      },
    ],
    porposalFrom: {
      type: String,
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
  required: ["name"],
};

module.exports = { ProjectSchema };
