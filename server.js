// server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html')
})


const players = {}; // Store player positions

const worldWidth = 20000
const worldHeight = 6000

io.on('connection', (socket) => {
  console.log('A user connected');

  // Generate a random position for the player within the game world
  const playerX = Math.random() * worldWidth;
  const playerY = Math.random() * worldHeight;

  // Create a unique player ID based on the socket ID
  const playerId = socket.id;

  // Store the player's position
  players[playerId] = { x: playerX, y: playerY };

  // Send the player's ID, position, and world dimensions to the client
  socket.emit('initPlayer', {
    id: playerId,
    x: playerX,
    y: playerY,
    worldWidth,
    worldHeight
  });

  // Broadcast the new player to other clients
  socket.broadcast.emit('newPlayer',
  {
    id: playerId,
    x: playerX,
    y: playerY,
    worldWidth,
    worldHeight
  }
   );

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');

    // Remove the player from the server-side player list
    delete players[playerId];

    // Broadcast to other clients that this player has disconnected
    socket.broadcast.emit('playerDisconnected', playerId);
  });

  
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



