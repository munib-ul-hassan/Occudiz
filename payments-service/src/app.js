const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { authenticateWithToken } = require("../../common/middleware/auth");

const app = express();
app.enable("json spaces");
app.enable("strict routing");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authenticateWithToken);

const mongodb = require("../../common/config/mongodb");
mongodb();


const payments = require("./routes/payments.js");
app.use(payments);

app.listen(process.env.PAYMENT_SERVICE_PORT, () => {
  try {
    console.log(`Payments-MicroServices is started on port = ${process.env.PAYMENT_SERVICE_PORT}`);
  } catch (error) {
    console.log("Something Went wrong");
  }
});
