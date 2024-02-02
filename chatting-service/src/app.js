const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { authenticateWithToken } = require("../../common/middleware/auth");
const app = express();

const cluster = require('node:cluster');
const http = require('node:http');
const numCPUs = require('node:os').availableParallelism();
const process = require('node:process');
const { setupMaster, setupWorker } = require("@socket.io/sticky");
const { createAdapter, setupPrimary } = require("@socket.io/cluster-adapter");
const { Server } = require("socket.io");
const amqp = require('amqplib');
const path = require('path');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authenticateWithToken);
app.use(express.static(path.join(__dirname, 'public')));

const mongodb = require("../../common/config/mongodb");
mongodb();

let channel;
const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();

    // Now you can use the 'channel' to interact with RabbitMQ

    // For example, create a queue
    const queueName = 'chat_messages';
    await channel.assertQueue(queueName, { durable: false });

    // Close the connection when done
    // connection.close();
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error.message);
  }
};

/**
 * Checking if the thread is a worker thread
 * or primary thread.
 */
if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  /**
  * Creating http-server for the master.
  * All the child workers will share the same port (3000)
  */
  const httpServer = http.createServer();
  httpServer.listen(process.env.CHATTING_SERVICE_PORT, () => {
    try {
      console.log(`Chatting-MicroServices is started on port = ${process.env.CHATTING_SERVICE_PORT}`);
      connectRabbitMQ().then(() => {
        console.log('Connected to RabbitMQ');
      });
    } catch (error) {
      console.log("Something Went wrong" + error);
    }
  });

  // Setting up stick session
  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection"
  });

  // Setting up communication between workers and primary
  setupPrimary();
  cluster.setupPrimary({
    serialization: "advanced"
  });

  // Launching workers based on the number of CPU threads.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  /**
   * Setting up the worker threads
   */

  console.log(`Worker ${process.pid} started`);

  /**
   * Creating Express App and Socket.io Server
   * and binding them to HTTP Server.
   */
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:8000", //specific origin you want to give access to,
    },
  });
  // Using the cluster socket.io adapter.
  io.adapter(createAdapter());

  // Setting up worker connection with the primary thread.
  setupWorker(io);

  io.on("connection", async (socket) => {
    const connection = await amqp.connect('amqp://localhost');
    const queueName = 'chat_messages';
    channel = await connection.createChannel();

    // Now you can use the 'channel' to interact with RabbitMQ
    await channel.assertQueue(queueName, { durable: false });
    // Handling socket connections.
    socket.on("message", async (data) => {
      console.log(`Message arrived at ${process.pid}:`, data);
      channel.sendToQueue("chat_messages", Buffer.from(JSON.stringify(data)));
      io.emit("message", data);
    });


    const handleMessage = (msg) => {
      const content = msg.content.toString();
      socket.emit("historical_messages", content);
      console.log(`Received message: ${content}`);
    };

    channel.consume(queueName, handleMessage, { noAck: true });
  });

  // Handle HTTP Requests
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'contrpublic', "index.html"))
  });
}
