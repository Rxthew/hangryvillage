const socket = io();


const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let playerId; // Store the player's ID

//Define canvas dimensions
const viewportWidth = 0.75 * window.innerWidth;
const viewportHeight = 0.75 * window.innerHeight;
canvas.width = viewportWidth;
canvas.height = viewportHeight;


// Initialize the canvas with the received viewport dimensions
socket.on('initPlayer', (data) => {
  playerId = data.id;

  drawPlayer(data);
});

socket.on('newPlayer', (data) => {
  
  drawPlayer(data);
});

socket.on('playerDisconnected', (playerId) => {
  delete players[playerId];
});

function drawPlayer(player) {
  // Set the visible area dimensions based on the world dimensions
  const visibleWidth = player.worldWidth/10;
  const visibleHeight = player.worldHeight/10;

  
  //Calculate the scale factor for the visible area based on the client's viewport dimensions
  const scaledWidthFactor = visibleWidth/viewportWidth;
  const scaledHeightFactor = visibleHeight/viewportHeight;
  

  // Calculate the circle's radius as a fraction of the viewport's width

  ctx.scale(scaledWidth,scaledHeight);
  ctx.beginPath();
  ctx.arc(100,75, 50, 0, Math.PI * 2);
  ctx.fillStyle = 'blue'; // You can assign different colors to different players
  ctx.fill();
  ctx.closePath();
}



// ... (handle player input and other game logic)