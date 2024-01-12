const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

const mongodb = require("./config/mongodb");

mongodb();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  try {
    console.log(`server is started on port = ${PORT}`);
  } catch (error) {
    console.log("Something Went wrong");
  }
});
