const { Router } = require('express');
const { addUsertoGroup } = require('../controller/user');
const { groupAuth } = require('../middlware/auth');

const router = Router({ mergeParams: true });

router.route('/').post(groupAuth, addUsertoGroup);

module.exports = router;
