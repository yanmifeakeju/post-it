const sequelize = require('../sequelize');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const User = sequelize.models.user;
const Member = sequelize.models.members;

exports.addUsertoGroup = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ where: { username: req.body.username } });

  if (req.user.id === user.id)
    return next(new ErrorResponse('You own the group', 400));

  if (user === null) return next(new ErrorResponse('User not found', 404));

  await Member.create({ userId: user.id, groupId: req.group.id });

  res.status(201).json({ success: true, data: user.username });
});
