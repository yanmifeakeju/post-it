const jwt = require('jsonwebtoken');
const { models } = require('../sequelize');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const User = models.user;

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    console.log(req.headers.authorization);
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    return next(
      new ErrorResponse('Protected Route: Authorization Required', 401)
    );

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (error) {
    next(new ErrorResponse('Protected Route: Authorization Required', 401));
  }
});
