const sequelize = require('../sequelize');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const User = sequelize.models.user;
const Group = sequelize.models.group;

exports.addUsertoGroup = asyncHandler(async (req, res, next) => {
  if (req.user.id !== req.group.userId)
    return next(
      new ErrorResponse(
        'Protected Route For Group Owner: Authorization Required',
        401
      )
    );
  const user = await User.findOne({ where: { username: req.body.username } });

  if (!user) return next(new ErrorResponse('User not found', 404));

  if (req.user.id === user.id)
    return next(new ErrorResponse('You own the group', 400));

  await sequelize.models.groupMembers.create({
    userId: user.id,
    groupId: req.group.id,
  });

  const members = await req.group.getGroupMembers();

  res.status(201).json({ success: true, data: { group: req.group, members } });
});
