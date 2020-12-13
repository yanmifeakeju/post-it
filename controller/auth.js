const { models } = require('../sequelize');
const asyncHandler = require('../utils/asyncHandler');

const User = models.user;

/**
 * @desc Get all groups
 * @method POST
 * @route /api/v1/user
 * @access public
 */
exports.create = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.create({
    username,
    email,
    password,
  });
  res.status(201).json({ success: true, data: user });
});

/**
 * @desc Get a group by id
 * @method POST
 * @route /api/v1/group/:id
 * @access public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const group = await Group.findByPk(req.params.id);
  res.status(200).json({ success: true, data: group });
});
