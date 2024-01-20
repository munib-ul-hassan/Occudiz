const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongodb = require("../../common/config/mongodb");

mongodb();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  try {
    console.log(`Payments-MicroServices is started on port = ${PORT}`);
  } catch (error) {
    console.log("Something Went wrong");
  }
});

app.get("/", (req, res) => {
  res.send("App is Running");
});