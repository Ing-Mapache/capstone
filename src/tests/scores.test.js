const request = require('supertest');
const app = require('../app');
const Score = require('../models/scoreModel');

describe('CRUD Operations for Scores', () => {
  let scoreId;

  // Registrar un nuevo score
  test('Create a new score', async () => {
    const response = await request(app)
      .post('/api/scores')
      .send({
        userId: 1,
        gameId: 1,
        score: 100,
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    scoreId = response.body.id;
  });

  // Obtener información de un score existente
  test('Get score by ID', async () => {
    const response = await request(app)
      .get(`/api/scores/${scoreId}`)
      .expect(200);

    expect(response.body.score).toBe(100);
  });

  // Actualizar detalles de un score
  test('Update score details', async () => {
    const response = await request(app)
      .put(`/api/scores/${scoreId}`)
      .send({ score: 150 })
      .expect(200);

    expect(response.body.score).toBe(150);
  });

  // Eliminar un score
  test('Delete score', async () => {
    await request(app)
      .delete(`/api/scores/${scoreId}`)
      .expect(204);

    const score = await Score.findByPk(scoreId);
    expect(score).toBeNull();
  });
});

describe('Get Current Scores of All Players', () => {
    let gameId;
  
    beforeAll(async () => {
      // Crear un juego y agregar puntuaciones
      const gameResponse = await request(app)
        .post('/api/games')
        .send({
          name: 'Score Game',
          rules: 'Test rules',
          maxPlayers: 4,
        });
      gameId = gameResponse.body.id;
  
      await request(app)
        .post('/api/scores')
        .send({
          userId: 1,
          gameId: gameId,
          score: 100,
        });
  
      await request(app)
        .post('/api/scores')
        .send({
          userId: 2,
          gameId: gameId,
          score: 150,
        });
    });
  
    test('Get current scores of all players', async () => {
      const response = await request(app)
        .post('/api/games/scores')
        .send({ game_id: gameId })
        .expect(200);
  
      expect(response.body.scores).toEqual({
        'Player1': 100,
        'Player2': 150,
      });
    });
  
    test('Get scores for a non-existent game', async () => {
      await request(app)
        .post('/api/games/scores')
        .send({ game_id: 9999 }) // ID inexistente
        .expect(404);
    });
  });