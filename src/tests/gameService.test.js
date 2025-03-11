const gameService = require('../services/gameService');

describe('GameService', () => {
  describe('calculateNextTurn', () => {
    test('debería calcular el siguiente turno en dirección horaria', () => {
      const players = ['Alice', 'Bob', 'Charlie', 'Diana'];
      const currentPlayerIndex = 1;
      const result = gameService.calculateNextTurn(players, currentPlayerIndex, 'clockwise');
      expect(result.nextPlayerIndex).toBe(2);
      expect(result.nextPlayer).toBe('Charlie');
    });

    test('debería calcular el siguiente turno en dirección antihoraria', () => {
      const players = ['Alice', 'Bob', 'Charlie', 'Diana'];
      const currentPlayerIndex = 1;
      const result = gameService.calculateNextTurn(players, currentPlayerIndex, 'counterclockwise');
      expect(result.nextPlayerIndex).toBe(0);
      expect(result.nextPlayer).toBe('Alice');
    });

    test('debería manejar el cambio de dirección con una carta de reversa', () => {
      const players = ['Alice', 'Bob', 'Charlie', 'Diana'];
      const currentPlayerIndex = 2;
      const result = gameService.processCardPlayed('reverse', currentPlayerIndex, players, 'clockwise');
      expect(result.newDirection).toBe('counterclockwise');
      expect(result.nextPlayerIndex).toBe(2); // El mismo jugador juega de nuevo
    });
  });

  describe('processCardPlayed', () => {
    test('debería saltar al siguiente jugador con una carta de salto', () => {
      const players = ['Alice', 'Bob', 'Charlie', 'Diana'];
      const currentPlayerIndex = 2;
      const result = gameService.processCardPlayed('skip', currentPlayerIndex, players, 'clockwise');
      expect(result.nextPlayerIndex).toBe(0);
      expect(result.nextPlayer).toBe('Alice');
      expect(result.skippedPlayer).toBe('Diana');
    });
  });

  describe('drawAndCheckCard', () => {
    test('debería robar una carta y verificar si es jugable', () => {
      const playerHand = ['red_2', 'blue_5'];
      const deck = ['green_4', 'yellow_skip', 'red_9'];
      const currentCard = 'blue_7';
      const result = gameService.drawAndCheckCard(playerHand, deck, currentCard);
      expect(result.newHand).toEqual(['red_2', 'blue_5', 'green_4', 'yellow_skip']);
      expect(result.drawnCard).toBe('yellow_skip');
      expect(result.playable).toBe(false);
    });

    test('debería robar una carta jugable', () => {
      const playerHand = ['red_2', 'blue_5'];
      const deck = ['green_4', 'blue_skip', 'red_9'];
      const currentCard = 'blue_7';
      const result = gameService.drawAndCheckCard(playerHand, deck, currentCard);
      expect(result.newHand).toEqual(['red_2', 'blue_5', 'green_4', 'blue_skip']);
      expect(result.drawnCard).toBe('blue_skip');
      expect(result.playable).toBe(true);
    });
  });
});