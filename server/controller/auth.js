const { models } = require('../sequelize');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const bcrypt = require('bcryptjs');

const User = models.user;
const Group = models.group;
const Member = models.members;

/**
 * @desc Get all groups
 * @method POST
 * @route /api/v1/auth/create
 * @access public
 */
exports.create = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.create({
    username,
    email,
    password,
  });

  // console.log(user.talk());
  res
    .status(201)
    .json({ success: true, token: await User.getSignedJWTtoken(user) });
});

/**
 * @desc Get all groups
 * @method POST
 * @route /api/v1/auth/login
 * @access public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email = '', password = '' } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse(`Please provide valid email and password`, 400)
    );
  }

  const user = await User.findOne({
    where: { email },
    attributes: { include: ['password'] },
  });

  if (!user) return next(new ErrorResponse(`Invalid credentials`, 401));

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) return next(new ErrorResponse(`Invalid credentials`, 401));

  res.status(200).json({ success: true, token: User.getSignedJWTtoken(user) });
});

/**
 * @desc Get all groups
 * @method POST
 * @route /api/v1/auth/me
 * @access private
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.user.id);
  const ownedGroups = await user.getGroups();
  const belongGroups = await user.getMemberGroups();

  // User.findAll({
  //   include: {
  //     model: Grant,
  //     include: Profile,
  //   },
  // });
  console.log(belongGroups);

  res
    .status(200)
    .json({ success: true, data: user, ownedGroups, belongGroups });
});
