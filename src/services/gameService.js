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

  calculateNextTurn(players, currentPlayerIndex) {
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;

    const nextPlayer = players[nextPlayerIndex];

    return {
      nextPlayerIndex,
      nextPlayer,
    };
  }

  processCardPlayed(cardPlayed, currentPlayerIndex, players, direction) {
    let nextPlayerIndex;
    let newDirection = direction;

    const isClockwise = direction === 'clockwise';

    if (cardPlayed === 'reverse') {
      newDirection = isClockwise ? 'counterclockwise' : 'clockwise';
      nextPlayerIndex = currentPlayerIndex;
    } else if (cardPlayed === 'skip') {
      if (isClockwise) {
        nextPlayerIndex = (currentPlayerIndex + 2) % players.length;
      } else {
        nextPlayerIndex = (currentPlayerIndex - 2 + players.length) % players.length;
      }
    } else {
      if (isClockwise) {
        nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
      } else {
        nextPlayerIndex = (currentPlayerIndex - 1 + players.length) % players.length;
      }
    }

    const nextPlayer = players[nextPlayerIndex];
    const skippedPlayer = cardPlayed === 'skip' ? players[(currentPlayerIndex + 1) % players.length] : null;

    return {
      newDirection,
      nextPlayerIndex,
      nextPlayer,
      skippedPlayer,
    };
  }

  isCardPlayable(card, currentCard) {
    const [cardColor, cardValue] = card.split('_');
    const [currentColor, currentValue] = currentCard.split('_');

    return cardColor === currentColor || cardValue === currentValue;
  }

  drawAndCheckCard(playerHand, deck, currentCard) {
    let drawnCard;
    let playable = false;

    while (deck.length > 0) {
      drawnCard = deck.shift();
      playerHand.push(drawnCard);

      if (this.isCardPlayable(drawnCard, currentCard)) {
        playable = true;
        break;
      }
    }

    return {
      newHand: playerHand,
      drawnCard,
      playable,
    };
  }
}


module.exports = GameService;