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

const nextTurn = async (req, res) => {
  try {
    const { players, currentPlayerIndex } = req.body;

    if (!players || !Array.isArray(players) || players.length === 0) {
      return res.status(400).json({ error: 'La lista de jugadores es inválida' });
    }

    if (currentPlayerIndex === undefined || currentPlayerIndex < 0 || currentPlayerIndex >= players.length) {
      return res.status(400).json({ error: 'El índice del jugador actual es inválido' });
    }

    const nextTurnData = gameService.calculateNextTurn(players, currentPlayerIndex);

    res.status(200).json({
      status: 200,
      body: nextTurnData,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al calcular el siguiente turno', details: error.message });
  }
};

const playCard = async (req, res) => {
  try {
    const { cardPlayed, currentPlayerIndex, players, direction } = req.body;

    if (!cardPlayed || !players || !Array.isArray(players) || players.length === 0) {
      return res.status(400).json({ error: 'Datos de entrada inválidos' });
    }

    if (currentPlayerIndex === undefined || currentPlayerIndex < 0 || currentPlayerIndex >= players.length) {
      return res.status(400).json({ error: 'El índice del jugador actual es inválido' });
    }

    if (!direction || !['clockwise', 'counterclockwise'].includes(direction)) {
      return res.status(400).json({ error: 'La dirección del juego es inválida' });
    }

    const result = gameService.processCardPlayed(cardPlayed, currentPlayerIndex, players, direction);

    res.status(200).json({
      status: 200,
      body: result,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la carta jugada', details: error.message });
  }
};

const drawCard = async (req, res) => {
  try {
    const { playerHand, deck, currentCard } = req.body;

    if (!playerHand || !Array.isArray(playerHand)) {
      return res.status(400).json({ error: 'La mano del jugador es inválida' });
    }

    if (!deck || !Array.isArray(deck) || deck.length === 0) {
      return res.status(400).json({ error: 'El mazo de cartas es inválido' });
    }

    if (!currentCard) {
      return res.status(400).json({ error: 'La carta actual es inválida' });
    }

    const result = gameService.drawAndCheckCard(playerHand, deck, currentCard);

    res.status(200).json({
      status: 200,
      body: result,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al robar una carta', details: error.message });
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
  nextTurn,
  playCard,
  drawCard,
};