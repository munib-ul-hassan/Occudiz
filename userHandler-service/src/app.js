const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const {authenticateWithToken}= require('../../common/middleware/auth');

const app = express();
app.enable("json spaces");
app.enable("strict routing");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authenticateWithToken);

const mongodb = require("../../common/config/mongodb");
mongodb();

const PORT = process.env.PORT || 3003;

const auth = require("./routes/auth");
app.use("/auth", auth);

app.listen(PORT, () => {
  try {
    console.log(`userHandler-MicroServices is started on port = ${PORT}`);
  } catch (error) {
    console.log("Something Went wrong");
  }
});