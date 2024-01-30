const bidSchema = {
  type: "object",
  properties: {
    prices: { type: "number" },
    documents: {
      type: "string",
    },
    message: { type: "string" },
  },
  required: [],
};

module.exports = { bidSchema };
