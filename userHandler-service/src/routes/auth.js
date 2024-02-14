const express = require("express");
const authControler = require("../controller/auth");
const {
  registerSchema,
  loginSchema,
  updateSchemas,
} = require("../../../common/schemas/userHandler-service");
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
const upload = require("../../../common/middleware/multer.js");

const router = express.Router();
// const upload =
router.post("/email/verify", authControler.verifyOTP);
// router.post("/register/admin", authControler.AdminRegister);
router.post(
  "/register",
  upload.fields([
    { name: "idCard", maxCount: 2 },
    { name: "businessRegisterNum", maxCount: 2 },
  ]),
  requireSchema(registerSchema),
  authControler.UserRegister
);

// router.get("/all/admin", authControler.getAdmin);

router.get("/all", authControler.getUser);

router.post("/login", requireSchema(loginSchema), authControler.login);

router.get(
  "/all/freelancer",
  requireAdminUser,
  authControler.getUserFreeLancer
);

router.get("/all/Business", authControler.getUserBusiness);

router.get("/all/Project-Owner", authControler.getUserProjectOwner);

router.use(requireUser);
router.put(
  "/verify/user/:id",

  authControler.verifyUser
);

router.get("/one/:id", authControler.getOneUser);

router.post(
  "/update/:id",
  upload.fields([
    { name: "idCard", maxCount: 2 },
    { name: "businessRegisterNum", maxCount: 2 },
  ]),
  authControler.updateUSer
);

module.exports = router;
