const ProjectCreateSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    detail: {
      type: "string",
    },
    launchDate: {
      type: Date,
    },
    type: [
      {
        type: "_id",
        ref: "Type",
      },
    ],
    porposalFrom: {
      type: "string",
    },
    myMeeting: {
      type: Date,
    },
    status: [
      {
        type: "string",
      },
    ],
    stage: [
      {
        type: "string",
      },
    ],
    answerId: [
      {
        type: "string",
      },
    ],
    assignedTo: {
      type: "string",
    },
  },
  required: ["name"],
};

const updateProjectSchema = {
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
        type: "string",
      },
    ],
    stage: [
      {
        type: "string",
      },
    ],
    answerId: [
      {
        type: "string",
      },
    ],
    assignedTo: {
      type: "string",
    },
  },
  required: [],
};

const questionCreateSchema = {
  type: "object",
  properties: {
    question: { type: "string" },
    type: { type: "string" },
    options: { type: "string" },
    direct: { type: "string" },
    depAns: { type: "string" },
  },
  require: ["question", "type"],
};

const questionUpdateSchema = {
  type: "object",
  properties: {
    question: { type: "string" },
    type: { type: "string" },
    options: { type: "string" },
    direct: { type: "string" },
    depAns: { type: "string" },
  },
  require: ["question", "type"],
};

module.exports = {
  ProjectCreateSchema,
  updateProjectSchema,
  questionCreateSchema,
  questionUpdateSchema,
};
