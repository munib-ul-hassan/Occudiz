const express = require('express');
const httpProxy = require('http-proxy');
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { morganLogger } = require('../common/utils/log.js');

const app = express();
const proxy = httpProxy.createProxyServer();

app.enable("json spaces");
app.enable("strict routing");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan(morganLogger));

const routes = {
    "/chatting-service": "http://localhost:3000",
    "/payments-service": "http://localhost:3001",
    "/project-service": "http://localhost:3002",
    "/userHandler-service": "http://localhost:3003",
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
