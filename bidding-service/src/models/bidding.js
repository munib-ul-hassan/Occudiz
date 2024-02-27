const mongoose = require("mongoose");

const BiddingSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    prices: {
      type: Number,
    },
    documents: {
      type: [String],
      default: [],
    },
    message: {
      type: String,
    },
    day: {
      type: String,
    },
    month: {
      type: String,
    },
    status: {
      type: String,
      enum: ["accept", "reject", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const BiddingModel = mongoose.model("Bidding", BiddingSchema);

module.exports = BiddingModel;
