const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { authenticateWithToken } = require("../../common/middleware/auth");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authenticateWithToken);

const mongodb = require("../../common/config/mongodb");

mongodb();

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  try {
    console.log(`bidding-MicroServices is started on port = ${PORT}`);
  } catch (error) {
    console.log("Something Went wrong");
  }
});

const bidding = require("./routes/bidding.js");

app.get("/", (req, res) => {
  res.send("App is Running");
});

app.use("/", bidding);
