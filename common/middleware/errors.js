const logger = require('../utils/log.js');
const config = require('../utils/config.js');

const log = logger("api:middleware");
const showError = config.NODE_ENV !== "production";

/* 404 handler for the missing API endpoints
 * Due to how Express works, we don't know if the URL or HTTP method is
 * incorrect, so we cheat and return 404 in both cases.
 */
export const handle404 = (req, res, next) => {
  const { method, originalUrl } = req;
  log.info({ method, originalUrl }, `Unhandled API request ${method} ${originalUrl}`);
  res.status(404).json({ error: "Resource not found or unsupported HTTP method" });
};

/**
 * handle client errors
 */
export const handleClientError = (error, req, res, statusCode = 400) => {
  const { method, originalUrl } = req;
  log.info({ method, originalUrl }, `Client  Error: ${method} ${originalUrl}`);
  console.log(error);
  res.status(statusCode).json({ status: false, message: error.message, ...error });
};

/* 500 handler in case we have an error in one of our route handlers
 * We generate a unique error ID so it's easy for users to report and for
 * us to track.
 */
export const handleError = (error, req, res, next) => {
  const { method, originalUrl } = req;
  const errorId = Buffer.from(Math.random().toString().substr(2, 9)).toString("base64");
  const errorObject = {
    name: error.name,
    message: error.message,
    ...error,
  };

  log.error(
    {
      method,
      originalUrl,
      error: errorObject,
      errorId,
    },
    `Error handling: ${method} ${originalUrl}`
  );

  if (showError) {
    res.status(500).json({ errorId, error: errorObject });
  } else {
    res
      .status(500)
      .json({ error: `Server error (ID=${errorId}), please try again later ` });
  }
};