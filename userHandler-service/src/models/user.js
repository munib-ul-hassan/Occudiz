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
    idCard: [
      {
        type: String,
        require: function () {
          return this.type === "FreeLancer" || this.type === "Business";
        },
      },
    ],
    businessRegisterNum: [
      {
        type: String,
        require: function () {
          return this.type === "Business";
        },
      },
    ],
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
    sub: {
      type: String,
      required: true,
      enum: ["normal", "five", "thentyFive"],
    },
    otp: {
      type: Number,
    },
    stripe_Id: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
