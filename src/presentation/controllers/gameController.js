const gameService = require('../../business/services/gameService');

const createGame = async (req, res, next) => {
  try {
    const gameData = req.body;
    const newGame = await gameService.createGame(gameData);
    res.status(201).json(newGame);
  } catch (error) {
    next(error);
  }
};

const getGameById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await gameService.getGameById(id);
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
};

const getAllGames = async (req, res, next) => {
  try {
    const games = await gameService.getAllGames();
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
};

const updateGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gameData = req.body;
    const updatedGame = await gameService.updateGame(id, gameData);
    res.status(200).json(updatedGame);
  } catch (error) {
    next(error);
  }
};

const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await gameService.deleteGame(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGame,
  getGameById,
  getAllGames,
  updateGame,
  deleteGame
};