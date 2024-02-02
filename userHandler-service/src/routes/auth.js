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
const router = express.Router();

router.post("/email/verify", authControler.verifyOTP);
// router.post("/register/admin", authControler.AdminRegister);
router.post(
  "/register",
  requireSchema(registerSchema),
  authControler.UserRegister
);

router.put("/verify/user/:id", requireAdminUser, authControler.verifyUser);

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

router.get("/one/:id", authControler.getOneUser);

router.put(
  "/update/:id",
  requireSchema(updateSchemas),
  authControler.updateUSer
);

module.exports = router;
