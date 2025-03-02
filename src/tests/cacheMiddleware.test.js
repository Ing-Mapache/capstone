const cacheMiddleware = require('../middlewares/cacheMiddleware');
const express = require('express');
const request = require('supertest');

describe('Cache Middleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    const cacheConfig = { max: 2, maxAge: 5000 };
    app.use(cacheMiddleware(cacheConfig));

    app.get('/api/data', (req, res) => {
      res.status(200).json({ message: 'Datos obtenidos correctamente' });
    });
  });

  test('should cache the response and return it on subsequent requests', async () => {
    const response1 = await request(app).get('/api/data');
    expect(response1.status).toBe(200);
    expect(response1.body.message).toBe('Datos obtenidos correctamente');

    const response2 = await request(app).get('/api/data');
    expect(response2.status).toBe(200);
    expect(response2.body.message).toBe('Datos obtenidos correctamente');
  });

  test('should expire the cache after maxAge', async () => {
    const response1 = await request(app).get('/api/data');
    expect(response1.status).toBe(200);

    await new Promise((resolve) => setTimeout(resolve, 6000));

    const response2 = await request(app).get('/api/data');
    expect(response2.status).toBe(200);
  });

  test('should remove the oldest entry when cache reaches max size', async () => {
    await request(app).get('/api/data?param=1');
    await request(app).get('/api/data?param=2');
    await request(app).get('/api/data?param=3');

    const cacheSize = Object.keys(require('../middlewares/cacheMiddleware').cache).length;
    expect(cacheSize).toBe(2);
  });
});