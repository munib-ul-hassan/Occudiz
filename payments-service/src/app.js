const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const payments =require('./routes/payments.js')

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(payments);

const mongodb = require("../../common/config/mongodb");

mongodb();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  try {
    console.log(`Payments-MicroServices is started on port = ${PORT}`);
  } catch (error) {
    console.log("Something Went wrong");
  }
});

