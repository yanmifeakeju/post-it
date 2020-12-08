const Group = require('../models/Group');
/**
 * @desc Get all groups
 * @method GET
 * @route /api/v1/group
 * @access PRIVATE
 */
exports.getGroups = async (req, res, next) => {
  try {
    const { count, rows } = await Group.findAndCountAll();
    res.status(200).json({ success: true, count, data: rows });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get a group by id
 * @method GET
 * @route /api/v1/group/:id
 * @access PRIVATE
 */
exports.getGroup = async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.id);
    res.status(200).json({ success: true, data: group });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc create a group
 * @method POST
 * @route /api/v1/group
 * @access PRIVATE
 */
exports.createGroup = async (req, res, next) => {
  try {
    const group = await Group.create(req.body);
    res.status(201).json({ successs: true, data: group });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc update a group by its id
 * @method PUT
 * @route /api/v1/group/:id
 * @access PRIVATE
 */
exports.updateGroup = async (req, res, next) => {
  res.status(200).json({
    status: true,
    data: {
      message: 'success from getting updating groups',
    },
  });
};

/**
 * @desc Delete a group by its id
 * @method DELETE
 * @route /api/v1/group/:id
 * @access PRIVATE
 */
exports.deleteGroup = async (req, res, next) => {
  res.status(200).json({
    status: true,
    data: {
      message: 'success from deleting groups',
    },
  });
};
