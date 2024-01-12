const AdminModel = require("../models/admin");
const UserModel = require("../models/user");
const AdminJoi = 

module.exports.AdminRegister = async (req, res) => {
  try {
    const body = req.body;
    const result = userSchema.validate(req.body, {
        abortEarly: false,
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: error });
  }
};
