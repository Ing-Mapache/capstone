const playerRepository = require('../../data/repositories/playerRepository');

const createPlayer = async (playerData) => {
  if (!playerData.name || !playerData.age || !playerData.email) {
    throw new Error('Nombre, edad y email son campos requeridos');
  }
  
  return await playerRepository.createPlayer(playerData);
};

const getPlayerById = async (id) => {
  const player = await playerRepository.getPlayerById(id);
  if (!player) {
    throw new Error('Jugador no encontrado');
  }
  return player;
};

const getAllPlayers = async () => {
  return await playerRepository.getAllPlayers();
};

const updatePlayer = async (id, playerData) => {
  const updatedPlayer = await playerRepository.updatePlayer(id, playerData);
  if (!updatedPlayer) {
    throw new Error('Jugador no encontrado');
  }
  return updatedPlayer;
};

const deletePlayer = async (id) => {
  const deleted = await playerRepository.deletePlayer(id);
  if (!deleted) {
    throw new Error('Jugador no encontrado');
  }
  return { message: 'Jugador eliminado correctamente' };
};

module.exports = {
  createPlayer,
  getPlayerById,
  getAllPlayers,
  updatePlayer,
  deletePlayer
};