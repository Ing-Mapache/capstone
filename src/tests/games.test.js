const request = require('supertest');
const app = require('../app');
const Game = require('../models/gameModel');

describe('CRUD Operations for Games', () => {
  let gameId;

  test('Create a new game', async () => {
    const response = await request(app)
      .post('/api/games')
      .send({
        name: 'Test Game',
        rules: 'Test rules',
        maxPlayers: 4,
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    gameId = response.body.id;
  });

  test('Get game by ID', async () => {
    const response = await request(app)
      .get(`/api/games/${gameId}`)
      .expect(200);

    expect(response.body.name).toBe('Test Game');
  });

  test('Update game details', async () => {
    const response = await request(app)
      .put(`/api/games/${gameId}`)
      .send({ name: 'Updated Game' })
      .expect(200);

    expect(response.body.name).toBe('Updated Game');
  });

  test('Delete game', async () => {
    await request(app)
      .delete(`/api/games/${gameId}`)
      .expect(204);

    const game = await Game.findByPk(gameId);
    expect(game).toBeNull();
  });
});

describe('Create a New Game', () => {
    test('Create a new game with valid data', async () => {
      const response = await request(app)
        .post('/api/games')
        .send({
          name: 'Test Game',
          rules: 'Test rules',
          maxPlayers: 4,
        })
        .expect(201);
  
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Test Game');
    });
  
    test('Create a game with missing required fields', async () => {
      await request(app)
        .post('/api/games')
        .send({
          name: 'Incomplete Game',
        })
        .expect(400);
    });
  });

  describe('Join an Existing Game', () => {
    let gameId;
  
    beforeAll(async () => {
      const response = await request(app)
        .post('/api/games')
        .send({
          name: 'Joinable Game',
          rules: 'Test rules',
          maxPlayers: 4,
        });
      gameId = response.body.id;
    });
  
    test('Join a game with valid game ID', async () => {
      const response = await request(app)
        .post('/api/games/join')
        .send({ game_id: gameId })
        .expect(200);
  
      expect(response.body.message).toBe('Usuario se unió al juego exitosamente');
    });
  
    test('Join a non-existent game', async () => {
      await request(app)
        .post('/api/games/join')
        .send({ game_id: 9999 })
        .expect(404);
    });
  });

  describe('Start Game When Players Are Ready', () => {
    let gameId;
  
    beforeAll(async () => {
      const gameResponse = await request(app)
        .post('/api/games')
        .send({
          name: 'Ready Game',
          rules: 'Test rules',
          maxPlayers: 2,
        });
      gameId = gameResponse.body.id;
  
      await request(app)
        .post('/api/games/join')
        .send({ game_id: gameId });
  
      await request(app)
        .post('/api/games/join')
        .send({ game_id: gameId });
    });
  
    test('Start game when all players are ready', async () => {
      const response = await request(app)
        .post('/api/games/start')
        .send({ game_id: gameId })
        .expect(200);
  
      expect(response.body.message).toBe('Juego iniciado exitosamente');
    });
  
    test('Start game with insufficient players', async () => {
      const newGameResponse = await request(app)
        .post('/api/games')
        .send({
          name: 'Insufficient Players Game',
          rules: 'Test rules',
          maxPlayers: 2,
        });
      const newGameId = newGameResponse.body.id;
  
      await request(app)
        .post('/api/games/start')
        .send({ game_id: newGameId })
        .expect(400);
    });
  });

  describe('Leave a Game in Progress', () => {
    let gameId;
  
    beforeAll(async () => {
      const gameResponse = await request(app)
        .post('/api/games')
        .send({
          name: 'Leavable Game',
          rules: 'Test rules',
          maxPlayers: 4,
        });
      gameId = gameResponse.body.id;
  
      await request(app)
        .post('/api/games/join')
        .send({ game_id: gameId });
    });
  
    test('Leave a game in progress', async () => {
      const response = await request(app)
        .post('/api/games/leave')
        .send({ game_id: gameId })
        .expect(200);
  
      expect(response.body.message).toBe('Usuario abandonó el juego exitosamente');
    });
  
    test('Leave a non-existent game', async () => {
      await request(app)
        .post('/api/games/leave')
        .send({ game_id: 9999 })
        .expect(404);
    });
  });

  describe('End a Game', () => {
    let gameId;
  
    beforeAll(async () => {
      // Crear un juego en progreso
      const gameResponse = await request(app)
        .post('/api/games')
        .send({
          name: 'Endable Game',
          rules: 'Test rules',
          maxPlayers: 4,
        });
      gameId = gameResponse.body.id;
  
      await request(app)
        .post('/api/games/start')
        .send({ game_id: gameId });
    });
  
    test('End a game in progress', async () => {
      const response = await request(app)
        .post('/api/games/end')
        .send({ game_id: gameId })
        .expect(200);
  
      expect(response.body.message).toBe('Juego finalizado exitosamente');
    });
  
    test('End a non-existent game', async () => {
      await request(app)
        .post('/api/games/end')
        .send({ game_id: 9999 })
        .expect(404);
    });
  });

  describe('Get Current Game State', () => {
    let gameId;
  
    beforeAll(async () => {
      const gameResponse = await request(app)
        .post('/api/games')
        .send({
          name: 'State Game',
          rules: 'Test rules',
          maxPlayers: 4,
        });
      gameId = gameResponse.body.id;
    });
  
    test('Get current game state', async () => {
      const response = await request(app)
        .post('/api/games/state')
        .send({ game_id: gameId })
        .expect(200);
  
      expect(response.body.state).toBe('waiting');
    });
  
    test('Get state of a non-existent game', async () => {
      await request(app)
        .post('/api/games/state')
        .send({ game_id: 9999 })
        .expect(404);
    });
  });

  describe('Get List of Players in the Game', () => {
    let gameId;
  
    beforeAll(async () => {
      const gameResponse = await request(app)
        .post('/api/games')
        .send({
          name: 'Player List Game',
          rules: 'Test rules',
          maxPlayers: 4,
        });
      gameId = gameResponse.body.id;
  
      await request(app)
        .post('/api/games/join')
        .send({ game_id: gameId });
  
      await request(app)
        .post('/api/games/join')
        .send({ game_id: gameId });
    });
  
    test('Get list of players in the game', async () => {
      const response = await request(app)
        .post('/api/games/players')
        .send({ game_id: gameId })
        .expect(200);
  
      expect(response.body.players.length).toBe(2);
    });
  
    test('Get players of a non-existent game', async () => {
      await request(app)
        .post('/api/games/players')
        .send({ game_id: 9999 })
        .expect(404);
    });
  });

  describe('Get Current Player to Play a Card', () => {
    let gameId;
  
    beforeAll(async () => {
      const gameResponse = await request(app)
        .post('/api/games')
        .send({
          name: 'Current Player Game',
          rules: 'Test rules',
          maxPlayers: 2,
        });
      gameId = gameResponse.body.id;
  
      await request(app)
        .post('/api/games/join')
        .send({ game_id: gameId });
  
      await request(app)
        .post('/api/games/join')
        .send({ game_id: gameId });
  
      await request(app)
        .post('/api/games/start')
        .send({ game_id: gameId });
    });
  
    test('Get current player to play a card', async () => {
      const response = await request(app)
        .post('/api/games/current-player')
        .send({ game_id: gameId })
        .expect(200);
  
      expect(response.body.current_player).toBeDefined();
    });
  
    test('Get current player for a non-existent game', async () => {
      await request(app)
        .post('/api/games/current-player')
        .send({ game_id: 9999 })
        .expect(404);s
    });
  });