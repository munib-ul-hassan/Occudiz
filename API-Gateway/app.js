const express = require("express");
const httpProxy = require("http-proxy");
const morgan = require("morgan");
const { morganLogger } = require("../common/utils/log.js");

const app = express();
const proxy = httpProxy.createProxyServer();

app.use(morgan(morganLogger));

const routes = {
  "/bidding-service": "http://localhost:8001",
  "/payments-service": "http://localhost:8005",
  "/project-service": "http://localhost:8003",
  "/userHandler-service": "http://localhost:8004",
  "/chatting-service": "http://localhost:8002",
};

for (const route in routes) {
  const target = routes[route];
  app.use(route, (req, res) => {
    proxy.web(req, res, { target: target });
  });
}

const PORT = 8000;
app.listen(PORT, () => {
  console.log("API GATEWAY STARTED");
});
