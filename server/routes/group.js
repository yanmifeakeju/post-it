const { Router } = require('express');

const {
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
} = require('../controller/group');
const { groupAuth, protect } = require('../middlware/auth');
const messagesRouter = require('./message');
const userRouter = require('./user');

const router = Router();
router.use(protect);
router.use('/:groupId/messages', groupAuth, messagesRouter);
router.use('/:groupId/user/', groupAuth, userRouter);

router.route('/').get(getGroups).post(createGroup);
router
  .route('/:id')
  .get(groupAuth, getGroup)
  .put(groupAuth, updateGroup)
  .delete(groupAuth, deleteGroup);

module.exports = router;
