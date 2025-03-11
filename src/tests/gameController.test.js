const gameController = require('../controllers/gameController');
const gameService = require('../services/gameService');

jest.mock('../services/gameService');

describe('GameController', () => {
  describe('playCard', () => {
    test('debería manejar una carta de salto correctamente', async () => {
      const req = {
        body: {
          cardPlayed: 'skip',
          currentPlayerIndex: 2,
          players: ['Alice', 'Bob', 'Charlie', 'Diana'],
          direction: 'clockwise',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      gameService.processCardPlayed.mockReturnValue({
        nextPlayerIndex: 0,
        nextPlayer: 'Alice',
        skippedPlayer: 'Diana',
      });

      await gameController.playCard(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        body: {
          nextPlayerIndex: 0,
          nextPlayer: 'Alice',
          skippedPlayer: 'Diana',
        },
      });
    });
  });

  describe('drawCard', () => {
    test('debería manejar la acción de robar una carta', async () => {
      const req = {
        body: {
          playerHand: ['red_2', 'blue_5'],
          deck: ['green_4', 'yellow_skip', 'red_9'],
          currentCard: 'blue_7',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      gameService.drawAndCheckCard.mockReturnValue({
        newHand: ['red_2', 'blue_5', 'green_4', 'yellow_skip'],
        drawnCard: 'yellow_skip',
        playable: false,
      });

      await gameController.drawCard(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        body: {
          newHand: ['red_2', 'blue_5', 'green_4', 'yellow_skip'],
          drawnCard: 'yellow_skip',
          playable: false,
        },
      });
    });
  });
});