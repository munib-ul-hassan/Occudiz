const express = require("express");
const biddingController = require("../controller/bidding.js");
const { bidSchema } = require("../../../common/schemas/bid.js");
const upload = require("../../../common/middleware/multer.js");
const {
  requireSchema,
  requireValidId,
} = require("../../../common/middleware/validate");
const {
  authenticateWithToken,
  requireUserProjectOwner,
  requireUserFreeLancer,
  requireUserBusiness,
  requireUser,
  requireCustomer,
  requireMerchantOrAdminUser,
  requireAdminUser,
} = require("../../../common/middleware/auth");
const router = express.Router();

router.post(
  "/add/bid/:projectId",
  requireUserProjectOwner,
  upload.array("documents", 1),
  // requireSchema(bidSchema),
  biddingController.createBidding
);

router.get("/all/bit", biddingController.getAllBit);
router.get("/all/project/bit", biddingController.getAllProjectBit);
router.get("/one/bit", biddingController.getOneBit);
router.post("/update/bit", biddingController.updateBitting);
module.exports = router;
