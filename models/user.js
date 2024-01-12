const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
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
    hashedPassword: {
      type: String,
      requier: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
      enum: ["Project-Owner", "FreeLancer", "Business"],
    },
    idCard: {
      type: String,
      require: function () {
        return this.type === "FreeLancer" || this.type === "Business";
      },
    },
    businessRegisterNum: {
      type: String,
      require: function () {
        return this.type === "Business";
      },
    },
    fcmToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
