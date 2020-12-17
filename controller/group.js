const sequelize = require('../sequelize');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const Group = sequelize.models.group;
const Member = sequelize.models.members;

/**
 * @desc Get all groups
 * @method GET
 * @route /api/v1/group
 * @access PRIVATE
 */
exports.getGroups = asyncHandler(async (req, res, next) => {
  const { count, rows } = await Group.findAndCountAll();
  res.status(200).json({ success: true, count, data: rows });
});

/**
 * @desc Get a group by id
 * @method GET
 * @route /api/v1/group/:id
 * @access PRIVATE
 */
exports.getGroup = asyncHandler(async (req, res, next) => {
  const group = await Group.findByPk(req.params.id);

  if (!group) return next(new ErrorResponse(`Group cannot be found`, 404));
  res.status(200).json({ success: true, data: group });
});

/**
 * @desc create a group
 * @method POST
 * @route /api/v1/group
 * @access PRIVATE
 */
exports.createGroup = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  const owner = req.user.id;

  const result = await sequelize.transaction(async (t) => {
    const group = await Group.create(
      {
        name,
        description,
        owner,
      },
      { transaction: t }
    );

    const member = await Member.create(
      {
        userId: owner,
        groupId: group.id,
      },
      { transaction: t }
    );

    return group;
  });

  res.status(201).json({ success: true, data: result });
});

/**
 * @desc update a group by its id
 * @method PUT
 * @route /api/v1/group/:id
 * @access PRIVATE
 */
exports.updateGroup = asyncHandler(async (req, res, next) => {
  const group = await Group.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  });
  console.log(group);
  if (!group[1]) return next(new ErrorResponse(`Group cannot be found`, 404));
  res.status(200).json({ sucess: true, data: group[1] });
});

/**
 * @desc Delete a group by its id
 * @method DELETE
 * @route /api/v1/group/:id
 * @access PRIVATE
 */
exports.deleteGroup = asyncHandler(async (req, res, next) => {
  const group = await Group.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!group[1]) return next(new ErrorResponse(`Group cannot be found`, 404));
  res.status(200).json({ sucess: true, data: {} });
});
