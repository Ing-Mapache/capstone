const playerService = require('../../business/services/playerService');

const createPlayer = async (req, res, next) => {
  try {
    const playerData = req.body;
    const newPlayer = await playerService.createPlayer(playerData);
    res.status(201).json(newPlayer);
  } catch (error) {
    next(error);
  }
};

const getPlayerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const player = await playerService.getPlayerById(id);
    res.status(200).json(player);
  } catch (error) {
    next(error);
  }
};

const getAllPlayers = async (req, res, next) => {
  try {
    const players = await playerService.getAllPlayers();
    res.status(200).json(players);
  } catch (error) {
    next(error);
  }
};

const updatePlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const playerData = req.body;
    const updatedPlayer = await playerService.updatePlayer(id, playerData);
    res.status(200).json(updatedPlayer);
  } catch (error) {
    next(error);
  }
};

const deletePlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await playerService.deletePlayer(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPlayer,
  getPlayerById,
  getAllPlayers,
  updatePlayer,
  deletePlayer
};