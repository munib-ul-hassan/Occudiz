const pino = require('pino');
const config = require('./config.js');

const level = config.LOG_LEVEL;

if (!pino.levels.values[level]) {
  const validLevels = Object.keys(pino.levels.values).join(", ");
  throw new Error(`Log level must be one of: ${validLevels}`);
}

const logger = (name) =>
  pino({
    name,
    customLevels: {
      http: 10,
      debug: 20,
      info: 30,
      warn: 40,
      error: 50,
      fatal: 60,
    },
    useOnlyCustomLevels: true,
    level,
  });

const morganLogger = (tokens, req, res) => {
  function getStatusColor(status) {
    if (status >= 200 && status < 300) {
      return "\x1b[32m"; // green
    } else if (status >= 300 && status < 400) {
      return "\x1b[33m"; // yellow
    } else {
      return "\x1b[31m"; // red
    }
  }

  return [
    tokens.method(req, res),
    tokens.url(req, res),
    getStatusColor(tokens.status(req, res)) + tokens.status(req, res) + "\x1b[0m", // reset color
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    "-",
    new Date(tokens.date(req, res)).toISOString(),
  ].join(" ");
};

module.exports = { logger, morganLogger };
