const Player = require('../models/player');
const { v4: uuidv4 } = require('uuid');

const createPlayer = async (playerData) => {
  try {
    const newPlayer = await Player.create({
      ...playerData,
      id: uuidv4()
    });
    return newPlayer.toJSON();
  } catch (error) {
    throw new Error(`Error al crear jugador: ${error.message}`);
  }
};

const getPlayerById = async (id) => {
  try {
    const player = await Player.findByPk(id);
    return player ? player.toJSON() : null;
  } catch (error) {
    throw new Error(`Error al obtener jugador: ${error.message}`);
  }
};

const getAllPlayers = async () => {
  try {
    const players = await Player.findAll();
    return players.map(player => player.toJSON());
  } catch (error) {
    throw new Error(`Error al obtener jugadores: ${error.message}`);
  }
};

const updatePlayer = async (id, playerData) => {
  try {
    const player = await Player.findByPk(id);
    if (!player) {
      return null;
    }
    
    await player.update(playerData);
    return player.toJSON();
  } catch (error) {
    throw new Error(`Error al actualizar jugador: ${error.message}`);
  }
};

const deletePlayer = async (id) => {
  try {
    const player = await Player.findByPk(id);
    if (!player) {
      return false;
    }
    
    await player.destroy();
    return true;
  } catch (error) {
    throw new Error(`Error al eliminar jugador: ${error.message}`);
  }
};

module.exports = {
  createPlayer,
  getPlayerById,
  getAllPlayers,
  updatePlayer,
  deletePlayer
};