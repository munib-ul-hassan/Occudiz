const express = require("express");
const authControler = require("../controller/auth");
const router = express.Router();

router.post("/register/admin", authControler.AdminRegister);

router.post("/register", authControler.UserRegister);

router.get("/all/admin", authControler.getAdmin);

router.get("/all", authControler.getUser);

router.post("/login", authControler.login);

router.get("/all/freelancer", authControler.getUserFreeLancer);

router.get("/all/Business", authControler.getUserBusiness);

router.get("/all/Project-Owner", authControler.getUserProjectOwner);

router.get("/one/:id", authControler.getOneUser);

module.exports = router;
