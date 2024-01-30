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
    role: {
      type: Number,
      required: true,
      default: 2,
    },
    token: {
      type: String,
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
    active: {
      type: Boolean,
      required: true,
      default: false,
    },
    fcmToken: {
      type: String,
    },
    userBids: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
