const express = require("express");
//const projectController = require("../controller/project");
const router = express.Router();

router.get("/", (req, res) => res.send("App is Running"));
router.get("/fine", (req, res) => res.send("fine"));

module.exports = router;
