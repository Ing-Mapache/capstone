const request = require('supertest');
const app = require('../app');
const Card = require('../models/cardModel');

describe('CRUD Operations for Cards', () => {
  let cardId;

  test('Create a new card', async () => {
    const response = await request(app)
      .post('/api/cards')
      .send({
        color: 'blue',
        value: '3',
        gameId: 1,
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    cardId = response.body.id;
  });

  test('Get card by ID', async () => {
    const response = await request(app)
      .get(`/api/cards/${cardId}`)
      .expect(200);

    expect(response.body.color).toBe('blue');
  });

  test('Update card details', async () => {
    const response = await request(app)
      .put(`/api/cards/${cardId}`)
      .send({ color: 'red' })
      .expect(200);

    expect(response.body.color).toBe('red');
  });

  test('Delete card', async () => {
    await request(app)
      .delete(`/api/cards/${cardId}`)
      .expect(204);

    const card = await Card.findByPk(cardId);
    expect(card).toBeNull();
  });
});

describe('Get Top Card of Discard Pile', () => {
    let gameId;
  
    beforeAll(async () => {
      const gameResponse = await request(app)
        .post('/api/games')
        .send({
          name: 'Discard Pile Game',
          rules: 'Test rules',
          maxPlayers: 4,
        });
      gameId = gameResponse.body.id;
  
      await request(app)
        .post('/api/cards')
        .send({
          color: 'blue',
          value: '3',
          gameId: gameId,
          isDiscarded: true,
        });
    });
  
    test('Get top card of discard pile', async () => {
      const response = await request(app)
        .post('/api/games/top-discard-card')
        .send({ game_id: gameId })
        .expect(200);
  
      expect(response.body.color).toBe('blue');
      expect(response.body.value).toBe('3');
    });
  
    test('Get top card for a non-existent game', async () => {
      await request(app)
        .post('/api/games/top-discard-card')
        .send({ game_id: 9999 })
        .expect(404);
    });
  });