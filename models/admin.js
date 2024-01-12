const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      requier: true,
    },
    fcm_token: {
      type: String,
    },
  },
  { timestamps: ture }
);

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminModel;
