const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

const auth = require("./routes/auth");

app.get("/", (req, res) => {
  res.send("App is Running");
});

app.use("/auth", auth);
