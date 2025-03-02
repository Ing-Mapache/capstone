const cacheMiddleware = (config) => {
    const cache = {};
    const accessTimes = {};
    let cacheSize = 0;
  
    const { max, maxAge } = config;
  
    const generateCacheKey = (req) => {
      const { method, originalUrl, query, headers } = req;
      const queryString = JSON.stringify(query);
      const headersString = JSON.stringify(headers);
      return `${method}:${originalUrl}:${queryString}:${headersString}`;
    };
  
    const cleanCache = () => {
      const now = Date.now();
  
      Object.keys(cache).forEach((key) => {
        if (now - accessTimes[key] > maxAge) {
          delete cache[key];
          delete accessTimes[key];
          cacheSize--;
        }
      });
  
      if (cacheSize > max) {
        const sortedKeys = Object.keys(accessTimes).sort(
          (a, b) => accessTimes[a] - accessTimes[b]
        );
        const keysToDelete = sortedKeys.slice(0, cacheSize - max);
  
        keysToDelete.forEach((key) => {
          delete cache[key];
          delete accessTimes[key];
          cacheSize--;
        });
      }
    };
  
    return (req, res, next) => {
      const cacheKey = generateCacheKey(req);
  
      if (cache[cacheKey] && Date.now() - accessTimes[cacheKey] <= maxAge) {
        console.log('Cache hit:', cacheKey);
        res.send(cache[cacheKey]);
        accessTimes[cacheKey] = Date.now();
        return;
      }
  
      console.log('Cache miss:', cacheKey);
  
      const originalSend = res.send;
      res.send = (body) => {
        if (res.statusCode === 200) {
          cache[cacheKey] = body;
          accessTimes[cacheKey] = Date.now();
          cacheSize++;
          cleanCache();
        }
        originalSend.call(res, body);
      };
  
      next();
    };
  };
  
  module.exports = cacheMiddleware;