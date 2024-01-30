const { handleClientError } = require("./errors");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");
const UserModel = require("../../userHandler-service/src/models/user");

const authenticateWithToken = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (authHeader) {
    const m = authHeader.match(/^(Token|Bearer) (.+)/i);

    if (m) {
      authenticateToken(m[2])
        .then((user) => {
          req.user = user;
          // console.log("request user: ", user);
          next();
        })
        .catch((err) => {
          if (err.message.includes("TokenExpiredError")) {
            handleClientError(err, req, res, 401);
          } else {
            next(err);
          }
        });
      return;
    }
  }

  next();
};

const requireUserProjectOwner = (req, res, next) => {
  if (
    !req.user ||
    (!parseInt(req.user?.role) === 2 && !req.user?.type === "Project-Owner")
  ) {
    res.status(401).json({
      error: "ONLY PROJECT MANAGER: You don't have access to this resource",
    });
    return;
  }

  next();
};

const requireUserFreeLancer = (req, res, next) => {
  if (
    !req.user ||
    !(parseInt(req.user?.role) === 2 && !req.user?.type === "FreeLancer")
  ) {
    res.status(401).json({
      error: "ONLY FREELANCER: You don't have access to this resource",
    });
    return;
  }

  next();
};

const requireUserBusiness = (req, res, next) => {
  if (
    !req.user ||
    !(parseInt(req.user?.role) === 2 && !req.user?.type === "Business")
  ) {
    res
      .status(401)
      .json({ error: "ONLY BUSINESS: You don't have access to this resource" });
    return;
  }

  next();
};

const requireUser = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ error: "You don't have access to this resource" });
    return;
  }

  next();
};

const requireCustomer = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ error: "You don't have access to this resource" });
    return;
  } else if (parseInt(req.user?.role) !== 2) {
    res
      .status(401)
      .json({ error: "ONLY USERS : You don't have access to this resource" });
    return;
  }

  next();
};

const requireMerchantOrAdminUser = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      error: "ONLY AUTHORIZED: You don't have access to this resource!",
    });
    return;
  } else if (
    !(parseInt(req.user?.role) === 1 || parseInt(req.user?.role) === 3)
  ) {
    res.status(401).json({
      error: "ONLY ADMIN | Merchants: You don't have access to this resource",
    });
    return;
  }

  next();
};

const requireAdminUser = (req, res, next) => {
  if (!req.user || !(parseInt(req.user?.role) === 1)) {
    res
      .status(401)
      .json({ error: "ONLY ADMIN: You don't have access to this resource" });
    return;
  }
  next();
};

const authenticateToken = async (token) => {
  const SECRET = config.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, SECRET);

    const UserRole =
      decoded.roleId === 1 ? "Admin" : decoded.roleId === 2 ? "User" : null;

    if (UserRole === null) throw Error("user role id not found in token");

    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return null;
    }

    delete user.password;
    return user;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  authenticateWithToken,
  requireUserProjectOwner,
  requireUserFreeLancer,
  requireUserBusiness,
  requireUser,
  requireCustomer,
  requireMerchantOrAdminUser,
  requireAdminUser,
};
