const { Router } = require('express');
const { create, login } = require('../controller/auth');

const router = Router();

router.route('/create').post(create);

module.exports = router;
