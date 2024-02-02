const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const userJoi = require("../../../common/middleware/joi/userSchema");
const config = require("../../../common/utils/config");
const SECRET = config.JWT_SECRET;

const JWT = require("jsonwebtoken");
const generateJWT = (payload, expires = "24h") =>
  JWT.sign(payload, SECRET, {
    expiresIn: expires,
  });

// module.exports.AdminRegister = async (req, res) => {
//   try {
//     const result = adminJoi.validate(req.body, {
//       abortEarly: false,
//     });

//     if (result.error) {
//       const x = result.error.details.map((error) => error.message);
//       return res.status(400).json({
//         success: false,
//         message: x,
//       });
//     }
//     result.value.email = result.value.email.toLowerCase();
//     const existingEmail = await AdminModel.findOne({
//       email: result.value.email,
//     });
//     if (existingEmail) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is already exists",
//       });
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(result.value.password, salt);

//     const newUser = new AdminModel({
//       ...result.value,
//       hashedPassword: hashedPassword,
//     });
//     await newUser.save();
//     return res.status(200).json({
//       success: true,
//       message: "Admin registered successfully",
//       data: newUser,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ success: false, message: error });
//   }
// };

module.exports.verifyUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "No user found on that Id" });
    }
    user.active = true;
    await user.save();

    return res
      .status(200)
      .send({ success: true, message: "User active sucessfully", data: user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

module.exports.UserRegister = async (req, res) => {
  try {
    const result = req.body;
    result.email = result.email.toLowerCase();
    if (result.error) {
      const x = result.error.details.map((error) => error.message);
      return res.status(400).json({
        success: false,
        message: x,
      });
    }

    const role = 2;
    let userBids = 5;
    const sub = "normal";

    const existingEmail = await UserModel.findOne({
      email: result.email,
    });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email is already exists",
      });
    }

    if (result.type == "Project-Owner") userBids = 0;

    const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(result.password, salt);

    const newUser = new UserModel({
      ...result,
      userBids,
      otp,
      sub,
      role,
      hashedPassword: hashedPassword,
    });
    await newUser.save();

    const user = await UserModel.findById(newUser._id.toString());
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "No user found on that Id" });
    }

    user.token = generateJWT(
      {
        id: newUser._id.toString(),
        email: user.email.toLowerCase(),
        roleId: user.role,
        type: user.type,
      },
      "30d"
    );

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: error });
  }
};

module.exports.verifyOTP = async (req, res) => {
  try {
    const { otpToken, email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "No user found on that email" });
    }
    if (!user.otp === otpToken) {
      return res
        .status(400)
        .send({ success: false, message: "Otp is not same" });
    }
    delete user.otp;
    res
      .status(200)
      .send({ success: true, message: "Otp verifyed successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error " });
  }
};

// module.exports.getAdmin = async (req, res) => {
//   const allData = await AdminModel.find();
//   if (!allData.length > 0) {
//     return res.status(400).json({
//       success: false,
//       message: "No Admin found",
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "All Admin",
//     data: allData,
//   });
// };

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

    user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "No user Found on that email" });
    }

    const validPassword = await bcrypt.compare(password, user.hashedPassword);
    if (!validPassword) {
      return res.status(400).send({
        success: false,
        message: "Maybe your Email or Password is not correct!",
      });
    }

    user.token = generateJWT(
      {
        id: user._id.toString(),
        email: user.email.toLowerCase(),
        roleId: user.role,
        type: user.type,
      },
      "30d"
    );

    await user.save();

    res.status(200).send({
      success: true,
      message: "You are loged-In",
      data: user,
    });
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

module.exports.updateUSer = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      type,
      idCard,
      businessRegisterNum,
    } = req.body;

    const userId = req.params.id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "No user found on that Id" });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.hashedPassword = hashedPassword || user.hashedPassword;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.type = type || user.type;
    user.idCard = idCard || user.idCard;
    user.businessRegisterNum = businessRegisterNum || user.businessRegisterNum;
    user.active = false;

    await user.save();

    res
      .status(200)
      .send({ success: true, message: "user updated sucessfully", data: user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error: error });
  }
};
