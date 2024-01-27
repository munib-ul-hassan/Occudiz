const BiddingModel = require("../models/bidding");

module.exports.createBidding = async (req, res) => {
  try {
    const validData = req.body;
    const userId = req.user;
    const projectId = req.params.Id;
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error: error });
  }
};
