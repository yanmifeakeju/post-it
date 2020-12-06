const { Router } = require('express');
const {
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
} = require('../controller/group');

const router = Router();

router.route('/').get(getGroups).post(createGroup);
router.route('/:id').get(getGroup).put(updateGroup).delete(deleteGroup);

module.exports = router;
