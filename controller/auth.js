const AdminModel = require("../models/admin");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const adminJoi = require("../middleware/joi/adminSchema");
const userJoi = require("../middleware/joi/userSchema");

module.exports.AdminRegister = async (req, res) => {
  try {
    const result = adminJoi.validate(req.body, {
      abortEarly: false,
    });
    if (result.error) {
      const x = result.error.details.map((error) => error.message);
      return res.status(400).json({
        success: false,
        message: x,
      });
    }
    const existingEmail = await AdminModel.findOne({
      email: result.value.email,
    });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email is already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(result.value.password, salt);

    const newUser = new AdminModel({
      ...result.value,
      hashedPassword: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "Admin registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: error });
  }
};

module.exports.UserRegister = async (req, res) => {
  try {
    const result = userJoi.validate(req.body, {
      abortEarly: false,
    });
    console.log(result.value);
    if (result.error) {
      const x = result.error.details.map((error) => error.message);
      return res.status(400).json({
        success: false,
        message: x,
      });
    }
    const existingEmail = await UserModel.findOne({
      email: result.value.email,
    });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email is already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(result.value.password, salt);

    const newUser = new UserModel({
      ...result.value,
      hashedPassword: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "Admin registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: error });
  }
};

module.exports.getAdmin = async (req, res) => {
  const allData = await AdminModel.find();
  if (!allData.length > 0) {
    return res.status(400).json({
      success: false,
      message: "No Admin found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "All Admin",
    data: allData,
  });
};

module.exports.getUser = async (req, res) => {
  const allData = await UserModel.find();
  if (!allData.length > 0) {
    return res.status(400).json({
      success: false,
      message: "No User found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "All Admin",
    data: allData,
  });
};
