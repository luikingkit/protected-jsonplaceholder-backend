// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  res.status(500).json({
    message: 'UNEXPECTED_ERROR_OCCURRED',
  });
};

module.exports = {
  errorHandler,
};
