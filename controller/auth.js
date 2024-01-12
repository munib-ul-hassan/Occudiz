const AdminModel = require("../models/admin");
const UserModel = require("../models/user");

module.exports.AdminRegister = async (req, res) => {
  try {
    const body = req.body;
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: error });
  }
};
