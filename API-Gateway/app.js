const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const routes = {
    '/chatting-service': "http://localhost:3000",
    '/payments-service': "http://localhost:3001",
    '/project-service': "http://localhost:3002",
    '/userHandler-service': "http://localhost:3003"
}

for (const route in routes) {
    const target = routes[route];
    app.use(route, createProxyMiddleware({ target }));
}

const PORT = 8000;
app.listen(PORT, () => {
    console.log("API GATEWAY STARTED")
});