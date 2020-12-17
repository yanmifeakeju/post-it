const sequelize = require('../sequelize');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @description Create message to a group
 * @method POST
 * @route /api/v1/:groupId/message
 * @access PRIVATE
 */
exports.createMessage = asyncHandler(async (req, res, next) => {
  const group = await Group.findByPk(req.params.groupId);

  if (!group) return next(new ErrorResponse(`Group does not exist`, 404));

  req.body.groupId = group.id;

  const message = await Message.create(req.body);

  res.status(201).json({ success: true, data: message });
});

exports.getMessages = asyncHandler(async (req, res, next) => {
  const group = await Group.findByPk(req.params.groupId);

  if (!group) return next(new ErrorResponse(`Group does not exist`, 404));

  req.body.groupId = group.id;

  const messages = await Message.findAll({
    where: {
      groupId: group.id,
    },
  });

  res.status(200).json({ success: true, data: messages });
});
