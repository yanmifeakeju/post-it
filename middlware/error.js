const ErrorResponse = require('../utils/errorResponse');

//TODO #Proper error message
const errorHandler = (err, req, res, next) => {
  console.log(err);
  let error = { ...err };
  error.message = err.message;

  if (err.name === 'SequelizeDatabaseError') {
    error = new ErrorResponse('Database Error', 500);
  }

  if ((err.name = 'SequelizeValidationError')) {
    error = new ErrorResponse('Validation Error', 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' });
};

module.exports = errorHandler;
