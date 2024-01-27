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
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const BiddingModel = mongoose.model("Bidding", BiddingSchema);

module.exports = BiddingModel;
