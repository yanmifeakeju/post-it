const { Router } = require('express');

const {
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
} = require('../controller/group');
const { protect } = require('../middlware/auth');
// const messagesRouter = require('./message');

const router = Router();
// router.use('/:groupId/messages', messagesRouter);

router.route('/').get(protect, getGroups).post(protect, createGroup);
router
  .route('/:id')
  .get(protect, getGroup)
  .put(protect, updateGroup)
  .delete(protect, deleteGroup);

module.exports = router;
