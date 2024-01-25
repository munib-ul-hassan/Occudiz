const express = require("express");
//const projectController = require("../controller/project");
const router = express.Router();

router.get("/", (req, res) => res.send("App is Running"));
router.get("/fine", (req, res) => res.send("fine"));
router.get('/resourceA', (req, res) => {
    res.json({ data: 'Resource A from Microservice A' });
  });
  router.post('/create-payment', (req, res) => {
    console.log(req.body)
    res.json({ data: 'POST' });
  });

module.exports = router;
