const express = require('express');
const cors = require('cors');
const { sequelize } = require('./data/config/database');

const playerRoutes = require('./presentation/routes/playerRoutes');
const gameRoutes = require('./presentation/routes/gameRoutes');
const cardRoutes = require('./presentation/routes/cardRoutes');
const scoreRoutes = require('./presentation/routes/scoreRoutes');

const errorHandler = require('./presentation/middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/players', playerRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/scores', scoreRoutes);

app.get('/', (req, res) => {
  res.send('API del juego UNO está funcionando');
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Base de datos conectada correctamente');
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;