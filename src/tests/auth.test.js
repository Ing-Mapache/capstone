const request = require('supertest');
const app = require('../app');

describe('User Registration', () => {
  test('Register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
  });

  test('Register with existing username', async () => {
    await request(app)
      .post('/api/users/register')
      .send({
        username: 'newuser',
        email: 'another@example.com',
        password: 'password123',
      })
      .expect(400);
  });
});

describe('User Login', () => {
    test('Login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'newuser',
          password: 'password123',
        })
        .expect(200);
  
      expect(response.body).toHaveProperty('access_token');
    });
  
    test('Login with invalid credentials', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          username: 'newuser',
          password: 'wrongpassword',
        })
        .expect(401);
    });
  });

  describe('User Logout', () => {
    let token;
  
    beforeAll(async () => {
      // Obtener un token válido
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'newuser',
          password: 'password123',
        });
      token = response.body.access_token;
    });
  
    test('Logout with valid token', async () => {
      await request(app)
        .post('/api/auth/logout')
        .set('Authorization', token)
        .expect(200);
    });
  });