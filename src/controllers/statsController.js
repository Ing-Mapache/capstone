const Tracking = require('../models/trackingModel');

const getRequestStats = async (req, res) => {
  try {
    const stats = await Tracking.findAll({
      attributes: [
        'endpointAccess',
        'requestMethod',
        [sequelize.fn('COUNT', sequelize.col('id')), 'requestCount'],
      ],
      group: ['endpointAccess', 'requestMethod'],
    });

    const breakdown = stats.reduce((acc, stat) => {
      const { endpointAccess, requestMethod, requestCount } = stat;
      if (!acc[endpointAccess]) acc[endpointAccess] = {};
      acc[endpointAccess][requestMethod] = requestCount;
      return acc;
    }, {});

    res.status(200).json({
      total_requests: stats.reduce((sum, stat) => sum + parseInt(stat.requestCount), 0),
      breakdown,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadísticas de solicitudes' });
  }
};

const getResponseTimes = async (req, res) => {
  try {
    const stats = await Tracking.findAll({
      attributes: [
        'endpointAccess',
        [sequelize.fn('AVG', sequelize.col('responseTime')), 'avg'],
        [sequelize.fn('MIN', sequelize.col('responseTime')), 'min'],
        [sequelize.fn('MAX', sequelize.col('responseTime')), 'max'],
      ],
      group: ['endpointAccess'],
    });

    const responseTimes = stats.reduce((acc, stat) => {
      acc[stat.endpointAccess] = {
        avg: parseFloat(stat.avg).toFixed(2),
        min: stat.min,
        max: stat.max,
      };
      return acc;
    }, {});

    res.status(200).json(responseTimes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tiempos de respuesta' });
  }
};

const getStatusCodes = async (req, res) => {
  try {
    const stats = await Tracking.findAll({
      attributes: [
        'statusCode',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      group: ['statusCode'],
    });

    const statusCodes = stats.reduce((acc, stat) => {
      acc[stat.statusCode] = stat.count;
      return acc;
    }, {});

    res.status(200).json(statusCodes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener códigos de estado' });
  }
};

const getPopularEndpoints = async (req, res) => {
  try {
    const stats = await Tracking.findAll({
      attributes: [
        'endpointAccess',
        [sequelize.fn('COUNT', sequelize.col('id')), 'requestCount'],
      ],
      group: ['endpointAccess'],
      order: [[sequelize.literal('requestCount'), 'DESC']],
      limit: 1,
    });

    if (stats.length === 0) {
      return res.status(200).json({ message: 'No hay datos de seguimiento' });
    }

    res.status(200).json({
      most_popular: stats[0].endpointAccess,
      request_count: stats[0].requestCount,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener endpoints populares' });
  }
};

module.exports = {
  getRequestStats,
  getResponseTimes,
  getStatusCodes,
  getPopularEndpoints,
};