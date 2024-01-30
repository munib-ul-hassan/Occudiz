const express = require("express");
const httpProxy = require("http-proxy");
const morgan = require("morgan");
require("dotenv").config();
const { morganLogger } = require("../common/utils/log.js");

const app = express();
const proxy = httpProxy.createProxyServer();

app.use(morgan(morganLogger));

const routes = {
  "/bidding-service": `http://localhost:${process.env.BIDDING_SERVICE_PORT}`,
  "/chatting-service": `http://localhost:${process.env.CHATTING_SERVICE_PORT}`,
  "/project-service": `http://localhost:${process.env.PROJECT_SERVICE_PORT}`,
  "/userHandler-service": `http://localhost:${process.env.USER_HANDLER_SERVICE_PORT}`,
  "/payments-service": `http://localhost:${process.env.PAYMENT_SERVICE_PORT}`,
};

for (const route in routes) {
  const target = routes[route];
  app.use(route, (req, res) => {
    proxy.web(req, res, { target: target });
  });
}


app.listen(process.env.API_GATEWAY_PORT, () => {
  try {
    console.log(`API GATEWAY is started on port = ${process.env.API_GATEWAY_PORT}`);
  } catch (error) {
    console.log("Something Went wrong");
  }
});
