const GameService = require('../services/gameService');
const gameService = new GameService();

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
    const gameId = req.params.id;
    const game = await gameService.getGameById(gameId);
    if (!game) return res.status(404).json({ error: 'Juego no encontrado' });
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
};

const updateGame = async (req, res, next) => {
  try {
    const gameId = req.params.id;
    const gameData = req.body;
    const updatedGame = await gameService.updateGame(gameId, gameData);
    if (!updatedGame) return res.status(404).json({ error: 'Juego no encontrado' });
    res.status(200).json(updatedGame);
  } catch (error) {
    next(error);
  }
};

const deleteGame = async (req, res, next) => {
  try {
    const gameId = req.params.id;
    const deleted = await gameService.deleteGame(gameId);
    if (!deleted) return res.status(404).json({ error: 'Juego no encontrado' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const joinGame = async (req, res, next) => {
  try {
    const { game_id } = req.body;
    const userId = req.user.userId;
    const result = await gameService.joinGame(userId, game_id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const startGame = async (req, res, next) => {
  try {
    const { game_id } = req.body;
    const userId = req.user.userId;
    const result = await gameService.startGame(userId, game_id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const leaveGame = async (req, res, next) => {
  try {
    const { game_id } = req.body;
    const userId = req.user.userId;
    const result = await gameService.leaveGame(userId, game_id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const endGame = async (req, res, next) => {
  try {
    const { game_id } = req.body;
    const userId = req.user.userId;
    const result = await gameService.endGame(userId, game_id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getGameState = async (req, res, next) => {
  try {
    const { game_id } = req.body;
    const gameState = await gameService.getGameState(game_id);
    res.status(200).json(gameState);
  } catch (error) {
    next(error);
  }
};

const getGamePlayers = async (req, res, next) => {
  try {
    const { game_id } = req.body;
    const gamePlayers = await gameService.getGamePlayers(game_id);
    res.status(200).json(gamePlayers);
  } catch (error) {
    next(error);
  }
};

const getCurrentPlayer = async (req, res, next) => {
  try {
    const { game_id } = req.body;
    const currentPlayer = await gameService.getCurrentPlayer(game_id);
    res.status(200).json(currentPlayer);
  } catch (error) {
    next(error);
  }
};

const getTopDiscardCard = async (req, res, next) => {
  try {
    const { game_id } = req.body;
    const topCard = await gameService.getTopDiscardCard(game_id);
    res.status(200).json(topCard);
  } catch (error) {
    next(error);
  }
};

const getPlayerScores = async (req, res, next) => {
  try {
    const { game_id } = req.body;
    const playerScores = await gameService.getPlayerScores(game_id);
    res.status(200).json(playerScores);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGame,
  getGameById,
  updateGame,
  deleteGame,
  joinGame,
  startGame,
  leaveGame,
  endGame,
  getGameState,
  getGamePlayers,
  getCurrentPlayer,
  getTopDiscardCard,
  getPlayerScores,
};