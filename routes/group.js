const { Router } = require('express');

const {
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
} = require('../controller/group');
const messagesRouter = require('./message');

const router = Router();
router.use('/:groupId/messages', messagesRouter);

router.route('/').get(getGroups).post(createGroup);
router.route('/:id').get(getGroup).put(updateGroup).delete(deleteGroup);

module.exports = router;
