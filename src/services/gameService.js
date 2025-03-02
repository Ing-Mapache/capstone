const GameRepository = require('../repositories/gameRepository');

class GameService {
  constructor() {
    this.gameRepository = new GameRepository();
  }

  async createGame(gameData) {
    return await this.gameRepository.create(gameData);
  }

  async getGameById(gameId) {
    return await this.gameRepository.findById(gameId);
  }

  async updateGame(gameId, gameData) {
    return await this.gameRepository.update(gameId, gameData);
  }

  async deleteGame(gameId) {
    return await this.gameRepository.delete(gameId);
  }

  async joinGame(userId, gameId) {
    return await this.gameRepository.joinGame(userId, gameId);
  }

  async startGame(userId, gameId) {
    const game = await this.gameRepository.findById(gameId);
    if (game.creatorId !== userId) throw new Error('Solo el creador del juego puede iniciarlo');
    return await this.gameRepository.startGame(gameId);
  }

  async leaveGame(userId, gameId) {
    const game = await this.gameRepository.findById(gameId);
    if (game.status !== 'in_progress') throw new Error('El juego no está en curso');
    return await this.gameRepository.leaveGame(userId, gameId);
  }

  async endGame(userId, gameId) {
    const game = await this.gameRepository.findById(gameId);
    if (game.creatorId !== userId) throw new Error('Solo el creador del juego puede finalizarlo');
    return await this.gameRepository.endGame(gameId);
  }

  async getGameState(gameId) {
    return await this.gameRepository.getGameState(gameId);
  }

  async getGamePlayers(gameId) {
    return await this.gameRepository.getGamePlayers(gameId);
  }

  async getCurrentPlayer(gameId) {
    return await this.gameRepository.getCurrentPlayer(gameId);
  }

  async getTopDiscardCard(gameId) {
    return await this.gameRepository.getTopDiscardCard(gameId);
  }

  async getPlayerScores(gameId) {
    return await this.gameRepository.getPlayerScores(gameId);
  }
}

module.exports = GameService;