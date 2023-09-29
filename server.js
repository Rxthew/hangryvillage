// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  // Handle custom events here
  // Example: socket.on('chat message', (msg) => { io.emit('chat message', msg); });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
