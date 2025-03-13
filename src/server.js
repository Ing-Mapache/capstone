// server.js
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const CardService = require('./services/cardService.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const cardService = new CardService();

const PORT = process.env.PORT || 5000;


io.on('connection', (socket) => {
  console.log('Nuevo jugador conectado:', socket.id);

  socket.on('join', (playerName) => {
    if (!playerName) {
      socket.emit('error', { message: 'El nombre del jugador es requerido.' });
      return;
    }

    cardService.players.push(playerName);
    cardService.playerHands[playerName] = [];

    io.emit('playerJoined', {
      message: `${playerName} se ha unido al juego.`,
      players: cardService.players,
    });

    socket.emit('gameState', cardService.getGameState());
  });

  socket.on('disconnect', () => {
    console.log('Jugador desconectado:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});