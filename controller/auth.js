const AdminModel = require("../models/admin");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const adminJoi = require("../middleware/joi/adminSchema");
const userJoi = require("../middleware/joi/userSchema");
const JWT = require("jsonwebtoken");

module.exports.AdminRegister = async (req, res) => {
  try {
    const result = adminJoi.validate(req.body, {
      abortEarly: false,
    });
    result.value.email = result.value.email.toLowerCase();

    console.log(result.value);
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
    result.value.email = result.value.email.toLowerCase();

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

module.exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Email or Password is required" });
    }
    // email = email.toLowerCase();

    let user = await AdminModel.findOne({ email });

    if (!user) {
      user = await UserModel.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .send({ success: false, message: "No user Found on that email" });
      }
    }

    const validPassword = await bcrypt.compare(password, user.hashedPassword);
    if (!validPassword) {
      return res.status(400).send({
        success: false,
        message: "Maybe your Email or Password is not correct!",
      });
    }

    let token = JWT.sign({ userId: user._id }, process.env.JWT_SEC_USER);
    if (!user.type) {
      token = JWT.sign({ userId: user._id }, process.env.JWT_SEC_ADMIN);
      user.type = "Admin";
    }

    res.status(200).send({
      success: true,
      message: "You are loged-In",
      data: user,
      type: user.type,
      token: token,
    });
    console.log(token);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error ",
      error: error,
    });
  }
};

module.exports.getUserFreeLancer = async (req, res) => {
  const allData = await UserModel.find({ type: "FreeLancer" });
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

module.exports.getUserProjectOwner = async (req, res) => {
  const allData = await UserModel.find({ type: "Project-Owner" });
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

module.exports.getUserBusiness = async (req, res) => {
  const allData = await UserModel.find({ type: "Business" });
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

module.exports.getOneUser = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const allData = await UserModel.findById(userId);
  if (!allData) {
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
