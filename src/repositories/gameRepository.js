const Game = require('../models/gameModel');
const PlayerGame = require('../models/playerGameModel');
const User = require('../models/userModel');
const Card = require('../models/cardModel');
const Score = require('../models/scoreModel');

class GameRepository {
  async create(gameData) {
    return await Game.create(gameData);
  }

  async findById(gameId) {
    return await Game.findByPk(gameId);
  }

  async update(gameId, gameData) {
    const [updated] = await Game.update(gameData, { where: { id: gameId } });
    if (updated) return await this.findById(gameId);
    return null;
  }

  async delete(gameId) {
    return await Game.destroy({ where: { id: gameId } });
  }

  async joinGame(userId, gameId) {
    const existingPlayer = await PlayerGame.findOne({ where: { userId, gameId } });
    if (existingPlayer) throw new Error('El usuario ya está en el juego');

    const playerCount = await PlayerGame.count({ where: { gameId } });
    const game = await this.findById(gameId);
    if (playerCount >= game.maxPlayers) throw new Error('El juego está lleno');

    return await PlayerGame.create({ userId, gameId });
  }

  async startGame(gameId) {
    const game = await this.findById(gameId);
    const players = await PlayerGame.findAll({ where: { gameId } });
    const allPlayersReady = players.every((player) => player.isReady);

    if (!allPlayersReady) throw new Error('No todos los jugadores están listos');

    return await game.update({ status: 'in_progress' });
  }

  async leaveGame(userId, gameId) {
    const player = await PlayerGame.findOne({ where: { userId, gameId } });
    if (!player) throw new Error('El usuario no está en el juego');

    await player.destroy();

    const remainingPlayers = await PlayerGame.count({ where: { gameId } });
    if (remainingPlayers < 2) {
      const game = await this.findById(gameId);
      await game.update({ status: 'finished' });
    }
  }

  async endGame(gameId) {
    const game = await this.findById(gameId);
    return await game.update({ status: 'finished' });
  }

  async getGameState(gameId) {
    const game = await this.findById(gameId, { attributes: ['id', 'status'] });
    if (!game) throw new Error('Juego no encontrado');
    return game;
  }

  async getGamePlayers(gameId) {
    const players = await PlayerGame.findAll({
      where: { gameId },
      include: [{ model: User, attributes: ['username'] }],
    });
    return players.map((player) => player.User.username);
  }

  async getCurrentPlayer(gameId) {
    const game = await this.findById(gameId);
    const players = await PlayerGame.findAll({
      where: { gameId },
      include: [{ model: User, attributes: ['username'] }],
      order: [['id', 'ASC']],
    });
    const currentPlayerIndex = game.currentTurn % players.length;
    return players[currentPlayerIndex].User.username;
  }

  async getTopDiscardCard(gameId) {
    const topCard = await Card.findOne({
      where: { gameId, isDiscarded: true },
      order: [['id', 'DESC']],
    });
    if (!topCard) throw new Error('No hay cartas en la pila de descartes');
    return topCard;
  }

  async getPlayerScores(gameId) {
    const scores = await Score.findAll({
      where: { gameId },
      include: [{ model: User, attributes: ['username'] }],
    });
    return scores.reduce((acc, score) => {
      acc[score.User.username] = score.score;
      return acc;
    }, {});
  }
}

module.exports = GameRepository;