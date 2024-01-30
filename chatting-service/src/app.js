const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const amqp = require('amqplib');
const { authenticateWithToken } = require("../../common/middleware/auth");
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:8000", //specific origin you want to give access to,
  },
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authenticateWithToken);

const mongodb = require("../../common/config/mongodb");
mongodb();

app.get('/test', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


let channel;

async function setupRabbitMQ() {
  const connection = await amqp.connect(process.env.AMQP_URL);
  channel = await connection.createChannel();
  await channel.assertExchange(process.env.EXCHANGE_NAME, 'fanout', { durable: false });
}

io.on('connection', (socket) => {
  console.log('User connected: ' + socket.id);

  socket.on('join', (userId) => {
    // Create a queue for each user and bind it to the exchange
    const queueName = `user_${userId}`;
    channel.assertQueue(queueName, { durable: false });
    channel.bindQueue(queueName, process.env.EXCHANGE_NAME, '');

    // Listen for messages from the user's queue
    channel.consume(queueName, (msg) => {
      const message = msg.content.toString();
      socket.emit('message', message);
    }, { noAck: true });
  });

  socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
    // Send the message to the exchange, which will forward it to all connected users
    const exchange = process.env.EXCHANGE_NAME;
    let data = {
      "senderId": senderId,
      "receiverId": receiverId,
      "message": message
    }
    channel.publish(exchange, '', Buffer.from(JSON.stringify(data)));

    // Send the message to the specific user's queue
    const userQueue = `user_${receiverId}`;
    channel.sendToQueue(userQueue, Buffer.from(JSON.stringify(data)));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
  });
});


http.listen(process.env.CHATTING_SERVICE_PORT, () => {
  try {
    console.log(`Chatting-MicroServices is started on port = ${process.env.CHATTING_SERVICE_PORT}`);
    setupRabbitMQ().then(() => {
      console.log('Connected to RabbitMQ');
    });
  } catch (error) {
    console.log("Something Went wrong");
  }
});