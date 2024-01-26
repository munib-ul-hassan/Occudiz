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
const router = express.Router();

// router.post("/register/admin", authControler.AdminRegister);
router.post(
  "/register",
  requireSchema(registerSchema),
  authControler.UserRegister
);

router.put("/verify/user/:id", authControler.verifyUser);

// router.get("/all/admin", authControler.getAdmin);

router.get("/all", authControler.getUser);

router.post("/login", requireSchema(loginSchema), authControler.login);

router.get("/all/freelancer", authControler.getUserFreeLancer);

router.get("/all/Business", authControler.getUserBusiness);

router.get("/all/Project-Owner", authControler.getUserProjectOwner);

router.get("/one/:id", authControler.getOneUser);

router.put(
  "/update/:id",
  requireSchema(updateSchemas),
  authControler.updateUSer
);

module.exports = router;
