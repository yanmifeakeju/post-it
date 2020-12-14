const { Router } = require('express');
const { create, login, getMe } = require('../controller/auth');
const { protect } = require('../middlware/auth');

const router = Router();

router.route('/create').post(create);
router.route('/login').post(login);
router.route('/me').get(protect, getMe);

module.exports = router;
