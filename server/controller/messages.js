const sequelize = require('../sequelize');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const Message = sequelize.models.message;

/**s
 * @description Create message in a group
 * @method POST
 * @route /api/v1/:groupId/message
 * @access PRIVATE
 */
exports.createMessage = asyncHandler(async (req, res, next) => {
  const { content = null } = req.body;

  if (!content) return next(new ErrorResponse('Message cannot be empty'));

  let message;

  if (req.group.userId === req.user.id) {
    console.log('this the owner message');
    message = await req.user.createMessage({ content, groupId: req.group.id });
  }

  const groups = await req.user.getMemberGroups();
  const isMember = groups.find((group) => group.id === req.params.groupId);

  if (!isMember) {
    return next(new ErrorResponse('You cannot post message to group'));
  }

  message = await req.user.createMessage({ content, groupId: isMember.id });

  res.status(201).json({ success: true, data: message });
});

exports.getMessages = asyncHandler(async (req, res, next) => {
  if (req.group.userId !== req.user.id) {
    const groups = await req.user.getMemberGroups();
    const isMember = groups.find((group) => group.id === req.params.groupId);
    if (!isMember) {
      return next(new ErrorResponse('You cannot view messages in this group'));
    }
    const messages = await req.group.getMessages();
    return res.status(200).json({ success: true, data: messages });
  }
  const messages = await req.group.getMessages();

  res.status(200).json({ success: true, data: messages });
});
