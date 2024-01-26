const mongoose = require("mongoose");

const BiddingSchema = new mongoose.Schema({}, { timestamps: true });

const BiddingModel = mongoose.model("Bidding", BiddingSchema);

module.exports = BiddingModel;
