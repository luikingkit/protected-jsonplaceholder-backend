const axios = require('axios');

const proxyToDomain = (targetDomain) => {
  return async (req, res, next) => {
    try {
      const url = `${targetDomain}${req.originalUrl.replace('/api', '')}`;

      const response = await axios({
        method: req.method,
        url: url,
        data: req.body,
      });

      const total = response.headers['x-total-count'];
      if (total != undefined) {
        res.setHeader('x-total-count', total);
      }

      res.status(response.status).json(response.data);
    } catch (error) {
      console.log('proxyToDomain error', error.message);
      next(error);
    }
  };
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  res.status(500).json({
    message: 'UNEXPECTED_ERROR_OCCURRED',
  });
};

module.exports = {
  proxyToDomain,
  errorHandler,
};
