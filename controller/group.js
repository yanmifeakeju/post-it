/**
 * @desc Get all groups
 * @method GET
 * @route /api/v1/group
 * @access PRIVATE
 */
exports.getGroups = (req, res, next) => {
  res.send({
    status: true,
    data: {
      message: 'success from getting all groups',
    },
  });
};

/**
 * @desc Get a group by id
 * @method GET
 * @route /api/v1/group/:id
 * @access PRIVATE
 */
exports.getGroup = (req, res, next) => {
  res.status(200).json({
    status: true,
    data: {
      message: 'success from getting a single groups',
    },
  });
};

/**
 * @desc create a group
 * @method POST
 * @route /api/v1/group
 * @access PRIVATE
 */
exports.createGroup = (req, res, next) => {
  res.status(200).json({
    status: true,
    data: {
      message: 'success from getting creating groups',
    },
  });
};

/**
 * @desc update a group by its id
 * @method PUT
 * @route /api/v1/group/:id
 * @access PRIVATE
 */
exports.updateGroup = (req, res, next) => {
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
exports.deleteGroup = (req, res, next) => {
  res.status(200).json({
    status: true,
    data: {
      message: 'success from deleting groups',
    },
  });
};
