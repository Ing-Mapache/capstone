const express = require('express');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const cardRoutes = require('./routes/cardRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
const authRoutes = require('./routes/authRoutes');
const errorLogger = require('./middlewares/errorLogger');
const errorHandler = require('./middlewares/errorHandler');
const cacheMiddleware = require('./middlewares/cacheMiddleware');
const logger = require('./utils/logger');

const cacheConfig = {
  max: 50,
  maxAge: 30000,
};

const app = express();

app.use(express.json());

app.use('/api', cacheMiddleware(cacheConfig));

app.use('/api', userRoutes);
app.use('/api', gameRoutes);
app.use('/api', cardRoutes);
app.use('/api', scoreRoutes);
app.use('/api/auth', authRoutes);

app.use(errorLogger);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;