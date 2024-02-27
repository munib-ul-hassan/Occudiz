const BiddingModel = require("../models/bidding");
const ProjectModel = require("../../../project-service/src/models/project");
const cloudinary = require("../../../common/middleware/cloudinary");
const fs = require("fs");

module.exports.createBidding = async (req, res) => {
  try {
    const validData = req.body;
    console.log(req.user);
    if (
      // req.user.businessRegisterNum.length == 0 ||
      // req.user.idCard.length == 0
      req.user.type != "Project-Owner"
    ) {
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
      if (attachArtwork.length > 0)
        documents = attachArtwork.map((i) => {
          return i.url;
        });

      const newBit = new BiddingModel({
        userId,
        projectId,
        prices: validData.prices,
        message: validData.message,
        documents,
        month: validData.month,
        day: validData.day,
      });

      await newBit.save();
      return res.status(200).send({ success: true, data: newBit });
    } else {
      return res
        .status(200)
        .send({ success: false, message: "You can't bid any project" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error: error });
  }
};

module.exports.getAllBit = async (req, res) => {
  try {
    const allBit = await BiddingModel.find()
      .populate("userId")
      .populate("projectId");

    res.status(200).send({ success: true, data: allBit });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

module.exports.getOneBit = async (req, res) => {
  try {
    const bitId = req.params.bitId;
    console.log(bitId);
    const allBit = await BiddingModel.findById(bitId)
      .populate("userId")
      .populate("projectId");

    if (!allBit) {
      return res
        .status(400)
        .send({ success: false, message: "No bit found on that Id " });
    }
    return res.status(200).send({ success: true, data: allBit });
  } catch (error) {}
  console.log(error);
  return res
    .status(500)
    .send({ success: false, message: "Internal server error" });
};

module.exports.getAllProjectBit = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    console.log(projectId);
    const allBit = await BiddingModel.find({ projectId, status: "pending" })
      .populate("userId")
      .populate("projectId");

    console.log(allBit);
    return res.status(200).send({ success: true, data: allBit });
  } catch (error) {}
  return res
    .status(500)
    .send({ success: false, message: "Internal server error" });
};

module.exports.getAllUserBit = async (req, res) => {
  try {
    const userId = req.params.userId;
    const allBit = await BiddingModel.find({ userId })
      .populate("userId")
      .populate("projectId");

    return res.status(200).send({ success: true, data: allBit });
  } catch (error) {}
  console.log(error);
  return res
    .status(500)
    .send({ success: false, message: "Internal server error" });
};

module.exports.updateBitting = async (req, res) => {
  try {
    const bitId = req.params.bitId;
    const { prices, documents, message, status, month, day } = req.body;

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
    console.log(req.user);
    const bit = await BiddingModel.findById(bitId).populate("projectId");

    if (!bit) {
      return res
        .status(400)
        .send({ success: false, message: "No bit found on that Id" });
    }
    if (bit.projectId.userId != req.user._id.toString() && status) {
      return res.status(400).send({
        success: false,
        message: "You are not authorize for accept or reject api",
      });
    }
    bit.prices = prices || bit.prices;
    attachArtwork.length > 0
      ? (bit.documents = attachArtwork.map((i) => {
          return i.url;
        }))
      : bit.documents,
      (bit.message = message || bit.message);
    bit.status = status || bit.status;
    bit.month = month || bit.month;
    bit.day = day || bit.day;

    await bit.save();

    res
      .status(200)
      .send({ success: true, message: "Updated successfully", data: bit });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};
