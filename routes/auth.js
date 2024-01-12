const express = require("express");
const authControler = require("../controller/auth");
const router = express.Router();

router.post("/register/admin", authControler.AdminRegister);

router.post("/register", authControler.UserRegister);

router.get("/all/admin", authControler.getAdmin);

router.get("/all", authControler.getUser);

module.exports = router;
