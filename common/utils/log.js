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

module.exports = logger;
