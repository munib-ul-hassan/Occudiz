require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || "production";
const DEFAULT_LOG_LEVEL = NODE_ENV === "production" ? "info" : "debug";

module.exports = {
  NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL,
  JWT_SECRET: process.env.JWT_SECRET,
};