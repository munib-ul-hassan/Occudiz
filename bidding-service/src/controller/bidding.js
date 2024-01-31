const BiddingModel = require("../models/bidding");
const ProjectModel = require("../../../project-service/src/models/project");
const cloudinary = require("../../../common/middleware/cloudinary");
const fs = require("fs");

module.exports.createBidding = async (req, res) => {
  try {
    const validData = req.body;

    const userId = req.user;

    const projectId = req.params.projectId;

    const project = await ProjectModel.findById(projectId);
    if (!userId.userBids > 0) {
      return res
        .status(400)
        .send({ success: false, message: "You dont have any bids more" });
    }
    if (!project) {
      return res
        .status(404)
        .send({ success: false, message: "No project found" });
    }

    const files = req.files;
    const attachArtwork = [];
    if (files || files?.length < 1) {
      for (const file of files) {
        const { path } = file;
        try {
          const uploader = await cloudinary.uploader.upload(path, {
            folder: "Occudiz",
          });

          attachArtwork.push({ url: uploader.secure_url });
          if (fs.existsSync(path)) {
            fs.unlinkSync(path);
          } else {
            console.log("File does not exist:", path);
          }
        } catch (err) {
          if (attachArtwork?.length) {
            // const imgs = imgObjs.map((obj) => obj.public_id);
            // cloudinary.api.delete_resources(imgs);
          }
          console.log(err);
        }
      }
    }

    let documents;
    if (attachArtwork.length > 0) documents = attachArtwork[0].url;

    const newBit = new BiddingModel({
      userId,
      projectId,
      prices: validData.prices,
      message: validData.message,
      documents,
    });
    // userId.userBids - 1;
    // await userId.save();
    await newBit.save();
    return res.status(200).send({ success: true, data: newBit });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error: error });
  }
};

module.exports.getAllBit = async (req, res) => {
  try {
    const allBit = await BiddingModel.find();
    res.status(200).send({ success: true, data: allBit });
  } catch (error) {}
  console.log(error);
  return res
    .status(500)
    .send({ success: false, message: "Internal server error" });
};

module.exports.getOneBit = async (req, res) => {
  try {
    const bitId = req.params.bitId;
    const allBit = await BiddingModel.findById(bitId);
    if (allBit) {
      return res
        .status(400)
        .send({ success: false, message: "No bit found on that Id " });
    }
    res.status(200).send({ success: true, data: allBit });
  } catch (error) {}
  console.log(error);
  return res
    .status(500)
    .send({ success: false, message: "Internal server error" });
};

module.exports.getAllProjectBit = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const allBit = await BiddingModel.find({ projectId });

    res.status(200).send({ success: true, data: allBit });
  } catch (error) {}
  console.log(error);
  return res
    .status(500)
    .send({ success: false, message: "Internal server error" });
};

module.exports.updateBitting = async (req, res) => {
  try {
    const bitId = req.params.bitId;
    const { prices, documents, message } = req.body;
    const bit = await BiddingModel.findById(bitId);
    if (!bit) {
      return res
        .status(400)
        .send({ success: false, message: "No bit found on that Id" });
    }
    bit.prices = prices || bit.prices;
    bit.documents = documents || bit.documents;
    bit.message = message || bit.message;
    await bit.save();

    res
      .status(200)
      .send({ success: false, message: "Updated successfully", data: bit });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};
